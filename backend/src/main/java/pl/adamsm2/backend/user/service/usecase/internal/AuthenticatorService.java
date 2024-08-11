package pl.adamsm2.backend.user.service.usecase.internal;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.adamsm2.backend.security.SecurePasswordManager;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.dto.LoginUserRequest;
import pl.adamsm2.backend.user.service.usecase.Authenticator;

@Service
@RequiredArgsConstructor
public class AuthenticatorService implements Authenticator {

    private final AuthenticationManager authenticationManager;
    private final SecurePasswordManager securePasswordManager;

    @Override
    public User authenticateUser(LoginUserRequest loginUserRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginUserRequest.email(), securePasswordManager.getPasswordWithPepper(loginUserRequest.password())));
        return (User) authentication.getPrincipal();
    }

}

