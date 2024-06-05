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
import pl.adamsm2.backend.apartment.service.usecase.ApartmentUseCases;

import java.util.List;

@RestController
@RequestMapping("/apartments")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public class ApartmentController {

    private final ApartmentUseCases apartmentUseCases;

    @GetMapping
    public ResponseEntity<Page<ApartmentResource>> getApartments(@PageableDefault(sort = "number", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(apartmentUseCases.getApartments(pageable));
    }

    @GetMapping("/currentUser")
    public ResponseEntity<List<ApartmentResource>> getApartmentsForCurrentUser() {
        return ResponseEntity.ok(apartmentUseCases.getApartmentsForCurrentUser());
    }

    @PostMapping("/owner")
    public ResponseEntity<Void> changeApartmentOwner(@RequestBody @Valid ChangeApartmentOwnerRequest changeApartmentOwnerRequest) {
        apartmentUseCases.changeApartmentOwner(changeApartmentOwnerRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
