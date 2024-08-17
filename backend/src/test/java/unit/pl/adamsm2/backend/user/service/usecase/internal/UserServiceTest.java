package pl.adamsm2.backend.user.service.usecase.internal;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.adamsm2.backend.security.JwtUtils;
import pl.adamsm2.backend.shared.exception.UserEmailNotVerifiedException;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.service.mapper.UserMapper;
import pl.adamsm2.backend.user.service.mapper.internal.UserMapperProvider;
import pl.adamsm2.backend.user.service.usecase.Authenticator;
import pl.adamsm2.backend.user.service.usecase.MailUseCases;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static pl.adamsm2.backend.user.UserTestDataProvider.getUserWithGivenEmail;
import static pl.adamsm2.backend.user.UserTestDataProvider.registerUserRequest;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private final InMemoryUserRepository userRepository = new InMemoryUserRepository();
    private final InMemoryRefreshTokenRepository refreshTokenRepository = new InMemoryRefreshTokenRepository();
    private final UserMapper userMapper = new UserMapperProvider().getUserMapper();
    private final Authenticator authenticator;
    private final JwtUtils jwtUtils = new JwtUtils("abc", 1000, 10000);
    private final MailUseCases mailService;
    private final UserUseCases userService;

    UserServiceTest(@Mock Authenticator authenticator, @Mock MailUseCases mailService) {
        this.authenticator = authenticator;
        this.mailService = mailService;
        this.userService = new UserService(userRepository, refreshTokenRepository, userMapper, authenticator, jwtUtils, mailService);
    }

    @AfterEach
    void cleanUp() {
        userRepository.clear();
        refreshTokenRepository.clear();
    }

    @Test
    void givenExistingUserWithVerifiedEmail_whenRegisterUser_thenThrowsIllegalStateException() {
        //given
        User user = getUserWithGivenEmail(registerUserRequest.email());
        user.setVerified(true);
        userRepository.save(user);

        //when then
        assertThrows(IllegalStateException.class, () -> userService.registerUser(registerUserRequest));
    }

    @Test
    void givenExistingUserWithNotVerifiedEmail_whenRegisterUser_thenThrowsUserEmailNotVerifiedException() {
        //given
        User user = getUserWithGivenEmail(registerUserRequest.email());
        user.setVerified(false);
        userRepository.save(user);

        //when then
        assertThrows(UserEmailNotVerifiedException.class, () -> userService.registerUser(registerUserRequest));
    }

    @Test
    void givenNotExistingUserEmail_whenRegisterUser_thenUserSaved() {
        //when
        userService.registerUser(registerUserRequest);

        //then
        assertTrue(userRepository.findByEmail(registerUserRequest.email()).isPresent());
        assertFalse(userRepository.findByEmail(registerUserRequest.email()).get().isVerified());
    }

    @Test
    void givenNotExistingUserEmail_whenRegisterUser_thenSendMailMethodCalled() {
        //when
        userService.registerUser(registerUserRequest);

        //then
        verify(mailService, times(1)).send(any(), any());
    }

}
