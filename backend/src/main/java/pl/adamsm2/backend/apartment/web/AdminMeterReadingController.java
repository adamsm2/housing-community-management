package pl.adamsm2.backend.apartment.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.adamsm2.backend.apartment.dto.MeterReadingRequest;
import pl.adamsm2.backend.apartment.service.usecase.MeterReadingUseCases;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.ADMIN_ENDPOINT;
import static pl.adamsm2.backend.shared.utils.ApiEndpoints.METER_READING_ENDPOINT;

@RestController
@RequestMapping(ADMIN_ENDPOINT + METER_READING_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class AdminMeterReadingController {
    private final MeterReadingUseCases meterReadingUseCases;

    @PostMapping()
    public ResponseEntity<Void> createMeterReading(@RequestBody MeterReadingRequest meterReadingRequest) {
        meterReadingUseCases.createMeterReading(meterReadingRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping()
    public ResponseEntity<Void> updateMeterReading(MeterReadingRequest meterReadingRequest) {
        meterReadingUseCases.updateMeterReading(meterReadingRequest);
        return ResponseEntity.ok().build();
    }

}
