package pl.adamsm2.backend.apartment.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.apartment.domain.Apartment;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
}
