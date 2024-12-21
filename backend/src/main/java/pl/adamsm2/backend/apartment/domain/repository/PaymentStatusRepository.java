package pl.adamsm2.backend.apartment.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.apartment.domain.EPaymentStatus;
import pl.adamsm2.backend.apartment.domain.PaymentStatus;

import java.util.Optional;

@Repository
public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, Long> {
    Optional<PaymentStatus> findByName(EPaymentStatus name);
}
