package pl.adamsm2.backend.user.service.mapper.internal;

import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.security.SecurePasswordManager;
import pl.adamsm2.backend.user.domain.Role;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.VerificationCode;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;
import pl.adamsm2.backend.user.dto.UserResource;
import pl.adamsm2.backend.user.service.mapper.UserMapper;

@Component
@RequiredArgsConstructor
class UserMapperService implements UserMapper {

    private final SecurePasswordManager securePasswordManager;

    @Override
    public User mapRegisterUserRequestToUser(@NonNull RegisterUserRequest registerUserRequest) {
        return User.builder()
                .email(registerUserRequest.email())
                .password(securePasswordManager.encodePassword(registerUserRequest.password()))
                .firstName(registerUserRequest.firstName())
                .lastName(registerUserRequest.lastName())
                .isVerified(false)
                .verificationCode(new VerificationCode())
                .role(Role.ROLE_USER)
                .build();
    }

    @Override
    public UserResource mapUserToUserResource(@NonNull User user) {
        return UserResource.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .build();
    }

}
