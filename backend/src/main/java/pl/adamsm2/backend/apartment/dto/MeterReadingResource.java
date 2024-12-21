package pl.adamsm2.backend.apartment.dto;

import lombok.Builder;
import pl.adamsm2.backend.apartment.domain.EPaymentStatus;

@Builder
public record MeterReadingResource(
        int apartmentNumber,
        int month,
        int year,
        double waterMeterReading,
        double electricityMeterReading,
        EPaymentStatus paymentStatus
) {
}
