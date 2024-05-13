package pl.adamsm2.backend.shared.seeder;

import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.user.domain.ERole;
import pl.adamsm2.backend.user.domain.Role;
import pl.adamsm2.backend.user.domain.repository.RoleRepository;

@Component
@RequiredArgsConstructor
@Order(0)
public class RoleSeeder implements Seeder {

    private final RoleRepository roleRepository;

    @Override
    public void seedDatabase(int objectsToSeed) {
        for (ERole role : ERole.values()) {
            roleRepository.save(
                    Role.builder()
                            .name(role)
                            .build());
        }
    }
}
