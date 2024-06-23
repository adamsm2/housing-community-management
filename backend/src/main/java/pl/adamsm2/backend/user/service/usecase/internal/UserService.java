package pl.adamsm2.backend.user.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adamsm2.backend.security.SecurityProperties;
import pl.adamsm2.backend.security.jwt.JwtUtils;
import pl.adamsm2.backend.shared.exception.UserAccountNotVerifiedException;
import pl.adamsm2.backend.user.domain.*;
import pl.adamsm2.backend.user.domain.repository.RefreshTokenRepository;
import pl.adamsm2.backend.user.domain.repository.RoleRepository;
import pl.adamsm2.backend.user.domain.repository.UserRepository;
import pl.adamsm2.backend.user.dto.*;
import pl.adamsm2.backend.user.service.mapper.UserMapper;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Collection;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UserService implements UserUseCases {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final SecurityProperties securityProperties;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final MailService mailService;

    @Override
    @Transactional
    public void registerUser(RegisterUserRequest registerUserRequest) {
        validateUserEmail(registerUserRequest.email());
        User user = userMapper.mapRegisterUserRequestToUser(registerUserRequest);
        VerificationCode verificationCode = generateVerificationCode();
        setRoleForNewUser(user);
        user.setPassword(getEncodedPassword(registerUserRequest.password()));
        user.setVerificationCode(verificationCode);
        userRepository.save(user);
        mailService.sendVerificationEmail(user.getEmail(), verificationCode.getCode());
    }

    @Override
    @Transactional
    public TokenResource loginUser(LoginUserRequest loginUserRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginUserRequest.email(), loginUserRequest.password() + securityProperties.getPepper()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        validateUserAccountIsVerified(user);
        TokenResource tokenResource = getTokenResource(user);
        refreshTokenRepository.findByUser(user).ifPresent(this::deleteOldRefreshToken);
        saveNewRefreshToken(user, tokenResource);
        return tokenResource;
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
    public UserDataResource getCurrentUserData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = authentication.getPrincipal() instanceof User principal ? principal : null;
        if (user != null) {
            return userMapper.mapUserToUserDataResource(user);
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    @Override
    @Transactional
    public TokenResource refreshToken(String jwt) {
        RefreshToken oldRefreshToken = refreshTokenRepository.findByJwt(jwt).orElseThrow();
        validateRefreshTokenIsNotExpired(oldRefreshToken);
        User user = oldRefreshToken.getUser();
        TokenResource tokenResource = getTokenResource(user);
        deleteOldRefreshToken(oldRefreshToken);
        saveNewRefreshToken(user, tokenResource);
        return tokenResource;
    }

    @Override
    public void verifyEmail(VerifyEmailRequest verifyEmailRequest) {
        User user = userRepository.findByEmail(verifyEmailRequest.email()).orElseThrow();
        VerificationCode verificationCode = user.getVerificationCode();
        validateUserIsNotVerified(user);
        validateVerificationCodeIsNotExpired(verificationCode);
        validateVerificationCodeIsValid(verificationCode.getCode(), verifyEmailRequest.code());
        user.setVerified(true);
        userRepository.save(user);
    }

    @Override
    public void resendVerificationEmail(ResendVerificationEmailRequest resendVerificationEmailRequest) {
        User user = userRepository.findByEmail(resendVerificationEmailRequest.email()).orElseThrow();
        validateVerificationCodeIsExpired(user.getVerificationCode());
        VerificationCode verificationCode = generateVerificationCode();
        user.setVerificationCode(verificationCode);
        userRepository.save(user);
        mailService.sendVerificationEmail(user.getEmail(), verificationCode.getCode());
    }

    @Override
    @Transactional
    public void logoutUser(String jwt) {
        final RefreshToken refreshToken = refreshTokenRepository.findByJwt(jwt).orElseThrow();
        refreshTokenRepository.delete(refreshToken);
    }

    private void validateUserEmail(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            if (user.isVerified()) {
                throw new IllegalStateException("User with email: " + email + " already exists");
            } else {
                throw new UserAccountNotVerifiedException("User account is not enabled");
            }
        });
    }

    private RefreshToken getNewRefreshToken(User user, String jwt) {
        return RefreshToken.builder()
                .user(user)
                .jwt(jwt)
                .expiryDate(Instant.now().plusMillis(securityProperties.getRefreshTokenExpiration()))
                .build();
    }

    private void saveNewRefreshToken(User user, TokenResource tokenResource) {
        RefreshToken newRefreshToken = getNewRefreshToken(user, tokenResource.refreshToken().jwt());
        refreshTokenRepository.save(newRefreshToken);
    }

    private void deleteOldRefreshToken(RefreshToken oldRefreshToken) {
        refreshTokenRepository.delete(oldRefreshToken);
        refreshTokenRepository.flush();
    }

    private void validateRefreshTokenIsNotExpired(RefreshToken refreshToken) {
        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new IllegalStateException("Refresh token has expired");
        }
    }

    private void validateUserIsNotVerified(User user) {
        if (user.isVerified()) {
            throw new IllegalStateException("User is already verified");
        }
    }

    private void validateVerificationCodeIsNotExpired(VerificationCode verificationCode) {
        if (verificationCode.getExpirationDate().isBefore(Instant.now())) {
            throw new IllegalStateException("Verification code has expired");
        }
    }

    private void validateVerificationCodeIsExpired(VerificationCode verificationCode) {
        if (verificationCode.getExpirationDate().isAfter(Instant.now())) {
            throw new IllegalStateException("Previous verification code is still valid");
        }
    }

    private void validateVerificationCodeIsValid(String code, String providedCode) {
        if (!code.equals(providedCode)) {
            throw new IllegalStateException("Invalid verification code");
        }
    }

    private void validateUserAccountIsVerified(User user) {
        if (!user.isVerified()) {
            throw new UserAccountNotVerifiedException("User account is not verified");
        }
    }

    private TokenResource getTokenResource(User user) {
        long accessTokenExpiration = securityProperties.getAccessTokenExpiration();
        long refreshTokenExpiration = securityProperties.getRefreshTokenExpiration();
        String jwtSecret = securityProperties.getJwtSecret();
        String accessToken = jwtUtils.createJwt(user, jwtSecret, accessTokenExpiration);
        String refreshToken = jwtUtils.createJwt(user, jwtSecret, refreshTokenExpiration);
        return TokenResource.builder()
                .accessToken(new TokenDetailsResource(accessToken, 10000))
                .refreshToken(new TokenDetailsResource(refreshToken, refreshTokenExpiration))
                .build();
    }

    private void setRoleForNewUser(User user) {
        final Role role = roleRepository.findByName(ERole.ROLE_USER).orElseThrow();
        user.setRole(role);
    }

    private String getEncodedPassword(String password) {
        String passwordWithPepper = password + securityProperties.getPepper();
        return passwordEncoder.encode(passwordWithPepper);
    }

    private VerificationCode generateVerificationCode() {
        String code = generateRandomCode();
        return VerificationCode.builder()
                .code(code)
                .expirationDate(Instant.now().plusMillis(securityProperties.getEmailVerificationCodeExpiration()))
                .build();
    }

    private String generateRandomCode() {
        StringBuilder sb = new StringBuilder();
        SecureRandom random = new SecureRandom();
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

}
