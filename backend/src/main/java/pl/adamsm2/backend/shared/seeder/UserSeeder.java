package pl.adamsm2.backend.shared.seeder;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.security.SecurityProperties;
import pl.adamsm2.backend.user.domain.ERole;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.RoleRepository;
import pl.adamsm2.backend.user.domain.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Order(1)
public class UserSeeder implements Seeder {

    private static final String ADMIN_EMAIL = "admin@gmail.com";
    private static final String ADMIN_PASSWORD = "admin123";
    private static final String USER_PASSWORD = "password";
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final Faker faker;
    private final SecurityProperties securityProperties;

    @Override
    public void seedDatabase(int objectsToSeed) {
        final Set<User> users = new HashSet<>();
        final User adminUser = createAdminUser();
        userRepository.save(adminUser);
        while (users.size() < objectsToSeed) {
            final User user = createUser();
            userRepository.save(user);
            users.add(user);
        }
    }

    private User createUser() {
        return User.builder()
                .email(faker.internet().emailAddress())
                .password(passwordEncoder.encode(USER_PASSWORD + securityProperties.getPepper()))
                .role(roleRepository.findByName(ERole.ROLE_USER).orElseThrow())
                .build();
    }

    private User createAdminUser() {
        return User.builder()
                .email(ADMIN_EMAIL)
                .password(passwordEncoder.encode(ADMIN_PASSWORD + securityProperties.getPepper()))
                .role(roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow())
                .build();
    }

}
