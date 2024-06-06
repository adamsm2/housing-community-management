package pl.adamsm2.backend.apartment.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.apartment.dto.SetUtilityPricesRequest;
import pl.adamsm2.backend.apartment.service.usecase.UtilityPriceUseCases;

@RestController
@RequestMapping("/utilityPrices")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public class UtilityPriceController {

    private final UtilityPriceUseCases utilityPriceUseCases;

    @PostMapping()
    public ResponseEntity<Void> setUtilityPrices(@RequestBody @Valid SetUtilityPricesRequest setUtilityPricesRequest) {
        utilityPriceUseCases.setUtilityPrices(setUtilityPricesRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
