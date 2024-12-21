package pl.adamsm2.backend.apartment.service.usecase;

import pl.adamsm2.backend.apartment.dto.SetUtilityPricesRequest;
import pl.adamsm2.backend.apartment.dto.UpdateUtilityPricesRequest;
import pl.adamsm2.backend.apartment.dto.UtilityPricesResource;

public interface UtilityPriceUseCases {

    void setUtilityPrices(SetUtilityPricesRequest setUtilityPricesRequest);

    void updateUtilityPrices(UpdateUtilityPricesRequest updateUtilityPricesRequest);

    UtilityPricesResource getUtilityPrices(int year);

}
