package pl.adamsm2.backend.apartment.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adamsm2.backend.apartment.domain.UtilityPrice;
import pl.adamsm2.backend.apartment.domain.repository.UtilityPriceRepository;
import pl.adamsm2.backend.apartment.dto.SetUtilityPricesRequest;
import pl.adamsm2.backend.apartment.service.mapper.UtilityPriceMapper;
import pl.adamsm2.backend.apartment.service.usecase.UtilityPriceUseCases;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UtilityPriceService implements UtilityPriceUseCases {

    private final UtilityPriceRepository utilityPriceRepository;
    private final UtilityPriceMapper utilityPriceMapper;


    @Override
    @Transactional
    public void setUtilityPrices(SetUtilityPricesRequest setUtilityPricesRequest) {
        validateMonthAndYear(setUtilityPricesRequest);
        UtilityPrice utilityPrice = utilityPriceMapper.mapSetUtilityPricesRequestToUtilityPrice(setUtilityPricesRequest);
        utilityPriceRepository.save(utilityPrice);
    }

    private void validateMonthAndYear(SetUtilityPricesRequest setUtilityPricesRequest) {
        LocalDate currentDate = LocalDate.now();
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();
        if (setUtilityPricesRequest.month() > currentMonth || setUtilityPricesRequest.year() > currentYear) {
            throw new IllegalArgumentException("Cannot set utility prices for future months or years");
        }
        if (utilityPriceRepository.existsByMonthAndYear(setUtilityPricesRequest.month(), setUtilityPricesRequest.year())) {
            throw new IllegalArgumentException("Utility prices for this month and year already exist");
        }
    }
}
