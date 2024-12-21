package pl.adamsm2.backend.apartment.service.mapper;

import org.springframework.lang.NonNull;
import pl.adamsm2.backend.apartment.domain.Apartment;
import pl.adamsm2.backend.apartment.dto.ApartmentResource;
import pl.adamsm2.backend.apartment.dto.CreateApartmentRequest;

public interface ApartmentMapper {

    ApartmentResource mapApartmentToApartmentResource(@NonNull Apartment apartment);

    Apartment mapCreateApartmentRequestToApartment(@NonNull CreateApartmentRequest createApartmentRequest);
}
