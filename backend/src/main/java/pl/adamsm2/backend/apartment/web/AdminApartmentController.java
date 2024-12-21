package pl.adamsm2.backend.apartment.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.adamsm2.backend.apartment.dto.ApartmentResource;
import pl.adamsm2.backend.apartment.dto.ChangeApartmentOwnerRequest;
import pl.adamsm2.backend.apartment.dto.CreateApartmentRequest;
import pl.adamsm2.backend.apartment.dto.UpdateApartmentRequest;
import pl.adamsm2.backend.apartment.service.usecase.ApartmentUseCases;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.ADMIN_ENDPOINT;
import static pl.adamsm2.backend.shared.utils.ApiEndpoints.APARTMENT_ENDPOINT;

@RestController
@RequestMapping(ADMIN_ENDPOINT + APARTMENT_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class AdminApartmentController {

    private final ApartmentUseCases apartmentUseCases;

    @GetMapping
    public ResponseEntity<Page<ApartmentResource>> getApartments(@PageableDefault(sort = "number", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(apartmentUseCases.getApartments(pageable));
    }

    @PostMapping("/owner")
    public ResponseEntity<Void> changeApartmentOwner(@RequestBody @Valid ChangeApartmentOwnerRequest changeApartmentOwnerRequest) {
        apartmentUseCases.changeApartmentOwner(changeApartmentOwnerRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping
    public ResponseEntity<Void> createApartment(@RequestBody @Valid CreateApartmentRequest createApartmentRequest) {
        apartmentUseCases.createApartment(createApartmentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> updateApartment(@RequestBody @Valid UpdateApartmentRequest updateApartmentRequest) {
        apartmentUseCases.updateApartment(updateApartmentRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
