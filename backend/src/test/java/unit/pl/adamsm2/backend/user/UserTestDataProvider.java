package pl.adamsm2.backend.user;

import pl.adamsm2.backend.user.domain.Role;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;

public class UserTestDataProvider {

    private static final String EMAIL = "abc@gmail.com";
    private static final String PASSWORD = "password";
    private static final String FIRST_NAME = "Adam";
    private static final String LAST_NAME = "Adam";

    public static final RegisterUserRequest registerUserRequest = getSampleRegisterUserRequest();

    public static User getUserWithGivenEmail(String email) {
        return User.builder()
                .email(email)
                .firstName(FIRST_NAME)
                .lastName(LAST_NAME)
                .role(Role.ROLE_USER)
                .build();
    }

    private static RegisterUserRequest getSampleRegisterUserRequest() {
        return new RegisterUserRequest(EMAIL, PASSWORD, FIRST_NAME, LAST_NAME);
    }

}
