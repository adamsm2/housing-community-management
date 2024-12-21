package pl.adamsm2.backend.apartment.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.adamsm2.backend.apartment.dto.SetUtilityPricesRequest;
import pl.adamsm2.backend.apartment.dto.UpdateUtilityPricesRequest;
import pl.adamsm2.backend.apartment.service.usecase.UtilityPriceUseCases;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.ADMIN_ENDPOINT;
import static pl.adamsm2.backend.shared.utils.ApiEndpoints.UTILITY_PRICE_ENDPOINT;

@RestController
@RequestMapping(ADMIN_ENDPOINT + UTILITY_PRICE_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class AdminUtilityPriceController {

    private final UtilityPriceUseCases utilityPriceUseCases;

    @PostMapping
    public ResponseEntity<Void> setUtilityPrices(@RequestBody @Valid SetUtilityPricesRequest setUtilityPricesRequest) {
        utilityPriceUseCases.setUtilityPrices(setUtilityPricesRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping
    public ResponseEntity<Void> updateUtilityPrices(@RequestBody @Valid UpdateUtilityPricesRequest updateUtilityPricesRequest) {
        utilityPriceUseCases.updateUtilityPrices(updateUtilityPricesRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
