package pl.adamsm2.backend.apartment.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.apartment.dto.UtilityPricesResource;
import pl.adamsm2.backend.apartment.service.usecase.UtilityPriceUseCases;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.UTILITY_PRICE_ENDPOINT;

@RestController
@RequestMapping(UTILITY_PRICE_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UtilityPriceController {

    private final UtilityPriceUseCases utilityPriceUseCases;

    @GetMapping("/{year}")
    public ResponseEntity<UtilityPricesResource> getUtilityPrices(@PathVariable int year) {
        return ResponseEntity.status(HttpStatus.OK).body(utilityPriceUseCases.getUtilityPrices(year));
    }

}
