package pl.adamsm2.backend.user.service.usecase;

import pl.adamsm2.backend.user.dto.RegisterUserRequest;

public interface UserUseCases {

    void registerUser(RegisterUserRequest registerUserRequest);

}
