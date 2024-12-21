package pl.adamsm2.backend.apartment.service.usecase;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.adamsm2.backend.apartment.dto.ApartmentResource;
import pl.adamsm2.backend.apartment.dto.ChangeApartmentOwnerRequest;
import pl.adamsm2.backend.apartment.dto.CreateApartmentRequest;
import pl.adamsm2.backend.apartment.dto.UpdateApartmentRequest;

import java.util.List;

public interface ApartmentUseCases {

    Page<ApartmentResource> getApartments(Pageable pageable);

    void changeApartmentOwner(ChangeApartmentOwnerRequest changeApartmentOwnerRequest);

    List<ApartmentResource> getApartmentsForCurrentUser();

    void createApartment(CreateApartmentRequest createApartmentRequest);

    void updateApartment(UpdateApartmentRequest updateApartmentRequest);

    ApartmentResource getApartmentByNumber(int number);
}
