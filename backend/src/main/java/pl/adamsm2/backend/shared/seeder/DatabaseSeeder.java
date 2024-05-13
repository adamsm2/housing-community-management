package pl.adamsm2.backend.shared.seeder;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
@ConditionalOnProperty(name = "seeders.enabled", havingValue = "true", matchIfMissing = true)
class DatabaseSeeder implements CommandLineRunner {

    private final UserSeeder userSeeder;
    private final RoleSeeder roleSeeder;

    @Override
    public void run(String... args) {
        roleSeeder.seedDatabase(1);
        userSeeder.seedDatabase(1);
    }

}
