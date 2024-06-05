package pl.adamsm2.backend.apartment.service.usecase;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.adamsm2.backend.apartment.dto.ApartmentResource;
import pl.adamsm2.backend.apartment.dto.ChangeApartmentOwnerRequest;

public interface ApartmentUseCases {

    Page<ApartmentResource> getApartments(Pageable pageable);

    void changeApartmentOwner(ChangeApartmentOwnerRequest changeApartmentOwnerRequest);
}
