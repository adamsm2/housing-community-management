package pl.adamsm2.backend.apartment.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.apartment.domain.MeterReading;

import java.util.Optional;

@Repository
public interface MeterReadingRepository extends JpaRepository<MeterReading, Long> {
    Optional<MeterReading> findByApartmentNumberAndYearAndMonth(int number, int year, int month);
}
