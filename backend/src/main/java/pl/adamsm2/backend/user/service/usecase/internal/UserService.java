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
import pl.adamsm2.backend.user.domain.ERole;
import pl.adamsm2.backend.user.domain.RefreshToken;
import pl.adamsm2.backend.user.domain.Role;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.RefreshTokenRepository;
import pl.adamsm2.backend.user.domain.repository.RoleRepository;
import pl.adamsm2.backend.user.domain.repository.UserRepository;
import pl.adamsm2.backend.user.dto.*;
import pl.adamsm2.backend.user.service.mapper.UserMapper;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

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

    @Override
    @Transactional
    public void registerUser(RegisterUserRequest registerUserRequest) {
        validateUserDoesntExist(registerUserRequest.email());
        User user = userMapper.mapRegisterUserRequestToUser(registerUserRequest);
        setRoleForNewUser(user);
        final String encodedPassword = passwordEncoder.encode(registerUserRequest.password() + securityProperties.getPepper());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public TokenResource loginUser(LoginUserRequest loginUserRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginUserRequest.email(), loginUserRequest.password() + securityProperties.getPepper()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
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
    @Transactional
    public void logoutUser(String jwt) {
        final RefreshToken refreshToken = refreshTokenRepository.findByJwt(jwt).orElseThrow();
        refreshTokenRepository.delete(refreshToken);
    }

    private void validateUserDoesntExist(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalStateException("User with email " + email + " already exists");
        }
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

}
