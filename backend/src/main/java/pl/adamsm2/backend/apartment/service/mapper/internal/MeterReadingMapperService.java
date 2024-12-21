package pl.adamsm2.backend.apartment.service.mapper.internal;

import org.springframework.stereotype.Component;
import pl.adamsm2.backend.apartment.domain.MeterReading;
import pl.adamsm2.backend.apartment.dto.MeterReadingRequest;
import pl.adamsm2.backend.apartment.dto.MeterReadingResource;
import pl.adamsm2.backend.apartment.service.mapper.MeterReadingMapper;

@Component
class MeterReadingMapperService implements MeterReadingMapper {

    @Override
    public MeterReadingResource mapMeterReadingToMeterReadingResource(MeterReading meterReading) {
        return MeterReadingResource.builder()
                .apartmentNumber(meterReading.getApartment().getNumber())
                .year(meterReading.getYear())
                .month(meterReading.getMonth())
                .waterMeterReading(meterReading.getWaterMeterReading())
                .electricityMeterReading(meterReading.getElectricityMeterReading())
                .paymentStatus(meterReading.getPaymentStatus())
                .build();
    }

    @Override
    public MeterReading mapMeterReadingRequestToMeterReading(MeterReadingRequest meterReadingRequest) {
        return MeterReading.builder()
                .apartment(null)
                .year(meterReadingRequest.year())
                .month(meterReadingRequest.month())
                .waterMeterReading(meterReadingRequest.waterMeterReading())
                .electricityMeterReading(meterReadingRequest.electricityMeterReading())
                .paymentStatus(meterReadingRequest.paymentStatus())
                .build();
    }
}
