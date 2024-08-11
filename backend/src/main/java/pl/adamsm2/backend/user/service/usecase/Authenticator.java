package pl.adamsm2.backend.user.service.usecase;

import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.dto.LoginUserRequest;

public interface Authenticator {

    User authenticateUser(LoginUserRequest loginUserRequest);

}
