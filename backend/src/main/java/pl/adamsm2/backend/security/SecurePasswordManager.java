package pl.adamsm2.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SecurePasswordManager {

    private final String pepper;
    private final PasswordEncoder passwordEncoder;

    public SecurePasswordManager(@Value("${app.pepper.value}") String pepper, PasswordEncoder passwordEncoder) {
        this.pepper = pepper;
        this.passwordEncoder = passwordEncoder;
    }

    public String encodePassword(String password) {
        return passwordEncoder.encode(getPasswordWithPepper(password));
    }

    public String getPasswordWithPepper(String password) {
        return password + pepper;
    }

}
