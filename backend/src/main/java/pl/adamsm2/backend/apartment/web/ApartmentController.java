package pl.adamsm2.backend.apartment.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.apartment.dto.ApartmentResource;
import pl.adamsm2.backend.apartment.service.usecase.ApartmentUseCases;

import java.util.List;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.APARTMENT_ENDPOINT;

@RestController
@RequestMapping(APARTMENT_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class ApartmentController {

    private final ApartmentUseCases apartmentUseCases;

    @GetMapping("/{number}")
    public ResponseEntity<ApartmentResource> getApartmentByNumber(@PathVariable int number) {
        return ResponseEntity.ok(apartmentUseCases.getApartmentByNumber(number));
    }

    @GetMapping("/currentUser")
    public ResponseEntity<List<ApartmentResource>> getApartmentsForCurrentUser() {
        return ResponseEntity.ok(apartmentUseCases.getApartmentsForCurrentUser());
    }

}
