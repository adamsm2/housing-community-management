package pl.adamsm2.backend.apartment.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.apartment.domain.Apartment;
import pl.adamsm2.backend.user.domain.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    Optional<Apartment> findByNumber(int number);

    List<Apartment> findAllByOwner(User owner);

    boolean existsByNumber(int number);

}
