package pl.adamsm2.backend.user.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adamsm2.backend.security.JwtUtils;
import pl.adamsm2.backend.shared.exception.UserEmailNotVerifiedException;
import pl.adamsm2.backend.shared.utils.DateTimeProvider;
import pl.adamsm2.backend.user.domain.*;
import pl.adamsm2.backend.user.domain.repository.RefreshTokenRepository;
import pl.adamsm2.backend.user.domain.repository.UserRepository;
import pl.adamsm2.backend.user.dto.*;
import pl.adamsm2.backend.user.service.mapper.UserMapper;
import pl.adamsm2.backend.user.service.usecase.Authenticator;
import pl.adamsm2.backend.user.service.usecase.MailUseCases;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

import java.time.Instant;
import java.util.Collection;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UserService implements UserUseCases {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserMapper userMapper;
    private final Authenticator authenticator;
    private final JwtUtils jwtUtils;
    private final MailUseCases mailService;

    @Override
    @Transactional
    public void registerUser(RegisterUserRequest registerUserRequest) {
        validateUserDoesntExist(registerUserRequest.email());
        User user = userMapper.mapRegisterUserRequestToUser(registerUserRequest);
        userRepository.save(user);
        sendVerificationMail(user);
    }

    @Override
    @Transactional
    public AuthResource loginUser(LoginUserRequest loginUserRequest) {
        User user = authenticator.authenticateUser(loginUserRequest);
        validateUserEmailIsVerified(user);
        Token newRefreshToken = jwtUtils.createRefreshToken(user);
        saveNewRefreshToken(user, newRefreshToken);
        return getAuthResource(user, newRefreshToken);
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<UserResource> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::mapUserToUserResource)
                .toList();

    }

    @Override
    @Transactional(readOnly = true)
    public UserResource getCurrentUserData() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userMapper.mapUserToUserResource(user);
    }

    @Override
    @Transactional
    public AuthResource refreshToken(String jwt) {
        RefreshToken oldRefreshToken = refreshTokenRepository.findByJwt(jwt).orElseThrow();
        validateRefreshTokenIsNotExpired(oldRefreshToken);
        User user = oldRefreshToken.getUser();
        Token newRefreshToken = jwtUtils.createRefreshToken(user);
        updateRefreshToken(oldRefreshToken, newRefreshToken);
        return getAuthResource(user, newRefreshToken);
    }

    @Override
    @Transactional
    public void verifyEmail(VerifyEmailRequest verifyEmailRequest) {
        User user = userRepository.findByEmail(verifyEmailRequest.email()).orElseThrow();
        VerificationCode verificationCode = user.getVerificationCode();
        validateUserEmailIsNotVerified(user);
        validateVerificationCodeIsNotExpired(verificationCode);
        validateVerificationCodeIsValid(verificationCode.getCode(), verifyEmailRequest.code());
        user.setVerified(true);
    }

    @Override
    @Transactional(readOnly = true)
    public Instant getVerificationCodeExpirationDate(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        validateUserEmailIsNotVerified(user);
        return user.getVerificationCode().getExpirationDate();
    }

    @Override
    @Transactional
    public void resendVerificationEmail(ResendVerificationEmailRequest resendVerificationEmailRequest) {
        User user = userRepository.findByEmail(resendVerificationEmailRequest.email()).orElseThrow();
        validateUserEmailIsNotVerified(user);
        validateVerificationCodeIsExpired(user.getVerificationCode());
        user.setVerificationCode(new VerificationCode());
        sendVerificationMail(user);
    }

    @Override
    @Transactional
    public void logoutUser(String jwt) {
        RefreshToken refreshToken = refreshTokenRepository.findByJwt(jwt).orElseThrow();
        refreshTokenRepository.delete(refreshToken);
    }

    private AuthResource getAuthResource(User user, Token refreshToken) {
        return AuthResource.builder()
                .accessToken(new AccessTokenResource(jwtUtils.createAccessToken(user).getJwt()))
                .refreshToken(new RefreshTokenResource(refreshToken.getJwt(), refreshToken.getExpirationInMs()))
                .build();
    }

    private void sendVerificationMail(User user) {
        String subject = "Verification code";
        String text = "Your verification code is: " + user.getVerificationCode().getCode() + "\nThis code will expire in 10 minutes";
        MailMessage mailMessage = new MailMessage(subject, text);
        mailService.send(user.getEmail(), mailMessage);
    }

    private void saveNewRefreshToken(User user, Token newToken) {
        Instant newExpiryDate = DateTimeProvider.INSTANCE.now().plusMillis(newToken.getExpirationInMs());
        refreshTokenRepository.findByUser(user).ifPresentOrElse(refreshToken -> updateRefreshToken(refreshToken, newToken),
                () -> refreshTokenRepository.save(RefreshToken.builder()
                        .jwt(newToken.getJwt())
                        .expiryDate(newExpiryDate)
                        .user(user)
                        .build())
        );
    }

    private void updateRefreshToken(RefreshToken refreshToken, Token newToken) {
        refreshToken.setJwt(newToken.getJwt());
        refreshToken.setExpiryDate(DateTimeProvider.INSTANCE.now().plusMillis(newToken.getExpirationInMs()));
    }

    private void validateUserDoesntExist(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            if (user.isVerified()) {
                throw new IllegalStateException("User with email: " + email + " already exists");
            } else {
                throw new UserEmailNotVerifiedException("User account is not enabled");
            }
        });
    }

    private void validateRefreshTokenIsNotExpired(RefreshToken refreshToken) {
        if (refreshToken.isExpired()) {
            refreshTokenRepository.delete(refreshToken);
            throw new IllegalStateException("Refresh token has expired");
        }
    }

    private void validateUserEmailIsNotVerified(User user) {
        if (user.isVerified()) {
            throw new IllegalStateException("User's Email is already verified");
        }
    }

    private void validateVerificationCodeIsNotExpired(VerificationCode verificationCode) {
        if (verificationCode.getExpirationDate().isBefore(DateTimeProvider.INSTANCE.now())) {
            throw new IllegalStateException("Verification code has expired");
        }
    }

    private void validateVerificationCodeIsExpired(VerificationCode verificationCode) {
        if (verificationCode.getExpirationDate().isAfter(DateTimeProvider.INSTANCE.now())) {
            throw new IllegalStateException("Previous verification code is still valid");
        }
    }

    private void validateVerificationCodeIsValid(String code, String providedCode) {
        if (!code.equals(providedCode)) {
            throw new IllegalStateException("Invalid verification code");
        }
    }

    private void validateUserEmailIsVerified(User user) {
        if (!user.isVerified()) {
            throw new UserEmailNotVerifiedException("User's email is not verified");
        }
    }

}
