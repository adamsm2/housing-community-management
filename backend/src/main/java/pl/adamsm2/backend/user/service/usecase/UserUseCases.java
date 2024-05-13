package pl.adamsm2.backend.user.service.usecase;

import pl.adamsm2.backend.user.dto.LoginUserRequest;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;
import pl.adamsm2.backend.user.dto.TokenResource;
import pl.adamsm2.backend.user.dto.UserResource;

import java.util.Collection;

public interface UserUseCases {

    void registerUser(RegisterUserRequest registerUserRequest);

    TokenResource loginUser(LoginUserRequest loginUserRequest);

    Collection<UserResource> getUsers();

    TokenResource refreshToken(String refreshToken);

    void logoutUser(String refreshToken);

}
