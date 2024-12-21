package pl.adamsm2.backend.apartment.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adamsm2.backend.apartment.domain.UtilityPrice;
import pl.adamsm2.backend.apartment.domain.repository.UtilityPriceRepository;
import pl.adamsm2.backend.apartment.dto.SetUtilityPricesRequest;
import pl.adamsm2.backend.apartment.dto.UpdateUtilityPricesRequest;
import pl.adamsm2.backend.apartment.dto.UtilityPricesResource;
import pl.adamsm2.backend.apartment.service.mapper.UtilityPriceMapper;
import pl.adamsm2.backend.apartment.service.usecase.UtilityPriceUseCases;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UtilityPriceService implements UtilityPriceUseCases {

    private final UtilityPriceRepository utilityPriceRepository;
    private final UtilityPriceMapper utilityPriceMapper;

    @Override
    @Transactional
    public void setUtilityPrices(SetUtilityPricesRequest setUtilityPricesRequest) {
        validateUtilityPricesInYearDontExist(setUtilityPricesRequest.year());
        UtilityPrice utilityPrice = utilityPriceMapper.mapSetUtilityPricesRequestToUtilityPrice(setUtilityPricesRequest);
        utilityPriceRepository.save(utilityPrice);
    }

    @Override
    @Transactional
    public void updateUtilityPrices(UpdateUtilityPricesRequest updateUtilityPricesRequest) {
        UtilityPrice utilityPrice = utilityPriceRepository.findByYear(updateUtilityPricesRequest.year())
                .orElseThrow(() -> new IllegalArgumentException("Utility prices for this year do not exist"));
        utilityPrice.setWaterPricePerUnit(updateUtilityPricesRequest.waterPricePerUnit());
        utilityPrice.setElectricityPricePerUnit(updateUtilityPricesRequest.electricityPricePerUnit());
    }

    @Override
    public UtilityPricesResource getUtilityPrices(int year) {
        UtilityPrice utilityPrice = utilityPriceRepository.findByYear(year).orElseThrow();
        return utilityPriceMapper.mapUtilityPriceToUtilityPricesResource(utilityPrice);
    }

    private void validateUtilityPricesInYearDontExist(int year) {
        if (utilityPriceRepository.existsByYear(year)) {
            throw new IllegalArgumentException("Utility prices for this year already exist");
        }
    }

}
