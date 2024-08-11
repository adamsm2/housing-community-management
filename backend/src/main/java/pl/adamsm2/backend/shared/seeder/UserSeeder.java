package pl.adamsm2.backend.shared.seeder;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.security.SecurePasswordManager;
import pl.adamsm2.backend.user.domain.Role;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.VerificationCode;
import pl.adamsm2.backend.user.domain.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Order(1)
public class UserSeeder implements Seeder {

    private static final String ADMIN_EMAIL = "admin@gmail.com";
    private static final String ADMIN_PASSWORD = "admin123";
    private static final String TEST_EMAIL = "test@gmail.com";
    private static final String USER_PASSWORD = "password";
    private final UserRepository userRepository;
    private final SecurePasswordManager securePasswordManager;
    private final Faker faker;


    @Override
    public void seedDatabase(int objectsToSeed) {
        final Set<User> users = new HashSet<>();
        final User adminUser = createAdminUser();
        final User testUser = createTestUser();
        userRepository.save(adminUser);
        userRepository.save(testUser);
        while (users.size() < objectsToSeed) {
            final User user = createUser();
            userRepository.save(user);
            users.add(user);
        }
    }

    private User createUser() {
        return User.builder()
                .email(faker.internet().emailAddress())
                .password(securePasswordManager.encodePassword(USER_PASSWORD))
                .role(Role.ROLE_USER)
                .build();
    }

    private User createTestUser() {
        return User.builder()
                .email(TEST_EMAIL)
                .password(securePasswordManager.encodePassword(USER_PASSWORD))
                .role(Role.ROLE_USER)
                .verificationCode(new VerificationCode())
                .build();
    }

    private User createAdminUser() {
        return User.builder()
                .email(ADMIN_EMAIL)
                .password(securePasswordManager.encodePassword(ADMIN_PASSWORD))
                .firstName("admin")
                .lastName("admin")
                .isVerified(true)
                .role(Role.ROLE_ADMIN)
                .build();
    }

}
