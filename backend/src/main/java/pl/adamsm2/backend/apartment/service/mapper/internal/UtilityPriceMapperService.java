package pl.adamsm2.backend.apartment.service.mapper.internal;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.apartment.domain.UtilityPrice;
import pl.adamsm2.backend.apartment.dto.SetUtilityPricesRequest;
import pl.adamsm2.backend.apartment.dto.UtilityPricesResource;
import pl.adamsm2.backend.apartment.service.mapper.UtilityPriceMapper;

@Component
class UtilityPriceMapperService implements UtilityPriceMapper {
    @Override
    public UtilityPrice mapSetUtilityPricesRequestToUtilityPrice(@NonNull SetUtilityPricesRequest setUtilityPricesRequest) {
        return UtilityPrice.builder()
                .year(setUtilityPricesRequest.year())
                .electricityPricePerUnit(setUtilityPricesRequest.electricityPricePerUnit())
                .waterPricePerUnit(setUtilityPricesRequest.waterPricePerUnit())
                .build();
    }

    @Override
    public UtilityPricesResource mapUtilityPriceToUtilityPricesResource(@NonNull UtilityPrice utilityPrice) {
        return UtilityPricesResource.builder()
                .year(utilityPrice.getYear())
                .electricityPricePerUnit(utilityPrice.getElectricityPricePerUnit())
                .waterPricePerUnit(utilityPrice.getWaterPricePerUnit())
                .build();
    }
}
