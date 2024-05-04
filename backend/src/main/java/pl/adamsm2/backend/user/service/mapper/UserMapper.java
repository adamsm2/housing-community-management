package pl.adamsm2.backend.user.service.mapper;

import org.springframework.lang.NonNull;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;

public interface UserMapper {

    User mapRegisterUserRequestToUser(@NonNull RegisterUserRequest registerUserRequest);
    
}
