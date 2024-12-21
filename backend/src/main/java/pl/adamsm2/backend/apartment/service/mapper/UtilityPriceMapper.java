package pl.adamsm2.backend.apartment.service.mapper;

import org.springframework.lang.NonNull;
import pl.adamsm2.backend.apartment.domain.UtilityPrice;
import pl.adamsm2.backend.apartment.dto.SetUtilityPricesRequest;
import pl.adamsm2.backend.apartment.dto.UtilityPricesResource;

public interface UtilityPriceMapper {
    UtilityPrice mapSetUtilityPricesRequestToUtilityPrice(@NonNull SetUtilityPricesRequest setUtilityPricesRequest);

    UtilityPricesResource mapUtilityPriceToUtilityPricesResource(@NonNull UtilityPrice utilityPrice);
}
