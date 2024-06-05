package pl.adamsm2.backend.shared.seeder;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.apartment.domain.Apartment;
import pl.adamsm2.backend.apartment.domain.repository.ApartmentRepository;

@Component
@RequiredArgsConstructor
@Order(2)
public class ApartmentSeeder implements Seeder {
    private final Faker faker;
    private final ApartmentRepository apartmentRepository;

    @Override
    public void seedDatabase(int objectsToSeed) {
        for (int i = 0; i < objectsToSeed; i++) {
            apartmentRepository.save(createApartment(1000 + i));
        }
    }

    private Apartment createApartment(int number) {
        return Apartment.builder()
                .number(number)
                .squareFootage(faker.number().numberBetween(20, 100))
                .owner(null)
                .build();
    }
}
