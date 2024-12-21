package pl.adamsm2.backend.apartment.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.apartment.domain.UtilityPrice;

import java.util.Optional;

@Repository
public interface UtilityPriceRepository extends JpaRepository<UtilityPrice, Long> {

    boolean existsByYear(int year);

    Optional<UtilityPrice> findByYear(int year);

}
