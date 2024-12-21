package pl.adamsm2.backend.apartment.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.adamsm2.backend.apartment.domain.Apartment;
import pl.adamsm2.backend.apartment.domain.MeterReading;
import pl.adamsm2.backend.apartment.domain.repository.ApartmentRepository;
import pl.adamsm2.backend.apartment.domain.repository.MeterReadingRepository;
import pl.adamsm2.backend.apartment.dto.MeterReadingRequest;
import pl.adamsm2.backend.apartment.dto.MeterReadingResource;
import pl.adamsm2.backend.apartment.service.mapper.MeterReadingMapper;
import pl.adamsm2.backend.apartment.service.usecase.MeterReadingUseCases;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class MeterReadingService implements MeterReadingUseCases {
    private final MeterReadingRepository meterReadingRepository;
    private final MeterReadingMapper meterReadingMapper;
    private final ApartmentRepository apartmentRepository;

    @Override
    public Page<MeterReadingResource> getMeterReadings(int apartmentNumber, Pageable pageable) {
        return null;

    }

    @Override
    public MeterReadingResource getMeterReading(int apartmentNumber, int year, int month) {
        MeterReading meterReading = meterReadingRepository.findByApartmentNumberAndYearAndMonth(apartmentNumber, year, month).orElseThrow();
        return meterReadingMapper.mapMeterReadingToMeterReadingResource(meterReading);
    }

    @Override
    public void createMeterReading(MeterReadingRequest meterReadingRequest) {
        validateMeterReadingDoesNotExist(meterReadingRequest);
        validateMonthAndYear(meterReadingRequest);
        Apartment apartment = apartmentRepository.findByNumber(meterReadingRequest.apartmentNumber()).orElseThrow();
        MeterReading meterReading = meterReadingMapper.mapMeterReadingRequestToMeterReading(meterReadingRequest);
        meterReading.setApartment(apartment);
        meterReadingRepository.save(meterReading);
    }

    @Override
    public void updateMeterReading(MeterReadingRequest meterReadingRequest) {
        MeterReading meterReading = meterReadingRepository.findByApartmentNumberAndYearAndMonth(
                        meterReadingRequest.apartmentNumber(), meterReadingRequest.year(), meterReadingRequest.month())
                .orElseThrow();
        validateMonthAndYear(meterReadingRequest);
        apartmentRepository.findByNumber(meterReadingRequest.apartmentNumber()).orElseThrow();
        meterReading.setWaterMeterReading(meterReadingRequest.waterMeterReading());
        meterReading.setElectricityMeterReading(meterReadingRequest.electricityMeterReading());
        meterReading.setPaymentStatus(meterReadingRequest.paymentStatus());
    }

    private void validateMeterReadingDoesNotExist(MeterReadingRequest meterReadingRequest) {
        if (meterReadingRepository.findByApartmentNumberAndYearAndMonth(meterReadingRequest.apartmentNumber(), meterReadingRequest.year(), meterReadingRequest.month()).isPresent()) {
            throw new IllegalArgumentException("Meter reading already exists");
        }
    }

    private void validateMonthAndYear(MeterReadingRequest meterReadingRequest) {
        if (meterReadingRequest.month() < 1 || meterReadingRequest.month() > 12) {
            throw new IllegalArgumentException("Invalid month");
        }
        if (meterReadingRequest.year() < 2000 || meterReadingRequest.year() > 2100) {
            throw new IllegalArgumentException("Invalid year");
        }
    }


}
