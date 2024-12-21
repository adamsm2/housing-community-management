package pl.adamsm2.backend.apartment.service.mapper;

import pl.adamsm2.backend.apartment.domain.MeterReading;
import pl.adamsm2.backend.apartment.dto.MeterReadingRequest;
import pl.adamsm2.backend.apartment.dto.MeterReadingResource;

public interface MeterReadingMapper {
    MeterReadingResource mapMeterReadingToMeterReadingResource(MeterReading meterReading);

    MeterReading mapMeterReadingRequestToMeterReading(MeterReadingRequest meterReadingRequest);
}
