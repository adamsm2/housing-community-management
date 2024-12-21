package pl.adamsm2.backend.apartment.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meterReadings")
public class MeterReadingController {

/*    @GetMapping("/{apartmentNumber}/{year}/{month}")
    public ResponseEntity<Page<MeterReadingResource>> getMeterReadings(@PathVariable int apartmentNumber, @PathVariable int year, @PathVariable int month) {
        return ResponseEntity.ok();
    }*/

}
