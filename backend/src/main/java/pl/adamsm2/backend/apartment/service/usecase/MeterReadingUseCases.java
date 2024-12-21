package pl.adamsm2.backend.apartment.service.usecase;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.adamsm2.backend.apartment.dto.MeterReadingRequest;
import pl.adamsm2.backend.apartment.dto.MeterReadingResource;

public interface MeterReadingUseCases {

    Page<MeterReadingResource> getMeterReadings(int apartmentNumber, Pageable pageable);

    MeterReadingResource getMeterReading(int apartmentNumber, int year, int month);

    void createMeterReading(MeterReadingRequest meterReadingRequest);

    void updateMeterReading(MeterReadingRequest meterReadingRequest);

}
