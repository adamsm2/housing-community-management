package pl.adamsm2.backend.user.service.usecase;

import pl.adamsm2.backend.user.dto.*;

import java.time.Instant;
import java.util.Collection;

public interface UserUseCases {

    void registerUser(RegisterUserRequest registerUserRequest);

    AuthResource loginUser(LoginUserRequest loginUserRequest);

    Collection<UserResource> getUsers();

    UserResource getCurrentUserData();

    AuthResource refreshToken(String jwt);

    AuthResource verifyEmail(VerifyEmailRequest verifyEmailRequest);

    Instant getVerificationCodeExpirationDate(String email);

    void resendVerificationEmail(ResendVerificationEmailRequest resendVerificationEmailRequest);

    void logoutUser(String jwt);

}
