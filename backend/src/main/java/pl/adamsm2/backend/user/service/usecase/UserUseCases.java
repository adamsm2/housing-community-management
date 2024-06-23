package pl.adamsm2.backend.user.service.usecase;

import pl.adamsm2.backend.user.dto.*;

import java.util.Collection;

public interface UserUseCases {

    void registerUser(RegisterUserRequest registerUserRequest);

    TokenResource loginUser(LoginUserRequest loginUserRequest);

    Collection<UserResource> getUsers();

    UserDataResource getCurrentUserData();

    TokenResource refreshToken(String jwt);

    void verifyEmail(VerifyEmailRequest verifyEmailRequest);

    void resendVerificationEmail(ResendVerificationEmailRequest resendVerificationEmailRequest);

    void logoutUser(String jwt);

}
