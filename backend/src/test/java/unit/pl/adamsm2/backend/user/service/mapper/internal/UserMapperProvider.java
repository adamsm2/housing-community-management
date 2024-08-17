package pl.adamsm2.backend.user.service.mapper.internal;

import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.adamsm2.backend.security.SecurePasswordManager;
import pl.adamsm2.backend.user.TestPasswordEncoder;
import pl.adamsm2.backend.user.service.mapper.UserMapper;

public class UserMapperProvider {

    private final PasswordEncoder passwordEncoder = new TestPasswordEncoder();
    private final SecurePasswordManager securePasswordManager = new SecurePasswordManager("pepper", passwordEncoder);
    @Getter
    private final UserMapper userMapper = new UserMapperService(securePasswordManager);

}
