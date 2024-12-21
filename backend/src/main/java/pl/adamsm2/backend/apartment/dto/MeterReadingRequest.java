package pl.adamsm2.backend.apartment.dto;

import pl.adamsm2.backend.apartment.domain.EPaymentStatus;

public record MeterReadingRequest(
        int apartmentNumber,
        int month,
        int year,
        double waterMeterReading,
        double electricityMeterReading,
        EPaymentStatus paymentStatus
) {
}
