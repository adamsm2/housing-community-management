package pl.adamsm2.backend.user.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.UserRepository;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;
import pl.adamsm2.backend.user.service.mapper.UserMapper;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UserService implements UserUseCases {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final String pepper;

    @Override
    @Transactional
    public void registerUser(RegisterUserRequest registerUserRequest) {
        validateUserDoesntExist(registerUserRequest.email());
        User user = userMapper.mapRegisterUserRequestToUser(registerUserRequest);
        final String encodedPassword = passwordEncoder.encode(registerUserRequest.password() + pepper);
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    private void validateUserDoesntExist(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalStateException("User with email " + email + " already exists");
        }
    }

}
