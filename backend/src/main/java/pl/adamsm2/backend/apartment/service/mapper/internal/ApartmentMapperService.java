package pl.adamsm2.backend.apartment.service.mapper.internal;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.apartment.domain.Apartment;
import pl.adamsm2.backend.apartment.dto.ApartmentResource;
import pl.adamsm2.backend.apartment.dto.CreateApartmentRequest;
import pl.adamsm2.backend.apartment.service.mapper.ApartmentMapper;
import pl.adamsm2.backend.user.domain.User;

@Component
class ApartmentMapperService implements ApartmentMapper {
    @Override
    public ApartmentResource mapApartmentToApartmentResource(@NonNull Apartment apartment) {
        final User owner = apartment.getOwner();
        return ApartmentResource.builder()
                .number(apartment.getNumber())
                .squareFootage(apartment.getSquareFootage())
                .ownerEmail(owner != null ? owner.getEmail() : null)
                .build();
    }

    @Override
    public Apartment mapCreateApartmentRequestToApartment(CreateApartmentRequest createApartmentRequest) {
        return Apartment.builder()
                .number(createApartmentRequest.number())
                .squareFootage(createApartmentRequest.squareFootage())
                .build();
    }
}
