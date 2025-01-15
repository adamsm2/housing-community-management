package pl.adamsm2.backend.apartment.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.apartment.dto.MeterReadingResource;
import pl.adamsm2.backend.apartment.service.usecase.MeterReadingUseCases;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.METER_READING_ENDPOINT;

@RestController
@RequestMapping(METER_READING_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public class MeterReadingController {
    private final MeterReadingUseCases meterReadingUseCases;

    @GetMapping("/{apartmentNumber}/{year}/{month}")
    public ResponseEntity<MeterReadingResource> getMeterReadings(@PathVariable int apartmentNumber, @PathVariable int year, @PathVariable int month) {
        return ResponseEntity.ok(meterReadingUseCases.getMeterReading(apartmentNumber, year, month));
    }

}
