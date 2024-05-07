package pl.adamsm2.backend.user.service.mapper.internal;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;
import pl.adamsm2.backend.user.dto.UserResource;
import pl.adamsm2.backend.user.service.mapper.UserMapper;

@Component
class UserMapperService implements UserMapper {

    @Override
    public User mapRegisterUserRequestToUser(@NonNull RegisterUserRequest registerUserRequest) {
        return User.builder()
                .email(registerUserRequest.email())
                .password(registerUserRequest.password())
                .build();
    }

    @Override
    public UserResource mapUserToUserResource(@NonNull User user) {
        return UserResource.builder()
                .email(user.getEmail())
                .build();
    }

}
