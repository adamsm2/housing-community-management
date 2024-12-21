package pl.adamsm2.backend.apartment.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adamsm2.backend.apartment.domain.Apartment;
import pl.adamsm2.backend.apartment.domain.repository.ApartmentRepository;
import pl.adamsm2.backend.apartment.dto.ApartmentResource;
import pl.adamsm2.backend.apartment.dto.ChangeApartmentOwnerRequest;
import pl.adamsm2.backend.apartment.dto.CreateApartmentRequest;
import pl.adamsm2.backend.apartment.dto.UpdateApartmentRequest;
import pl.adamsm2.backend.apartment.service.mapper.ApartmentMapper;
import pl.adamsm2.backend.apartment.service.usecase.ApartmentUseCases;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.UserRepository;

import java.util.List;

import static pl.adamsm2.backend.user.domain.Role.ROLE_ADMIN;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class ApartmentService implements ApartmentUseCases {

    private final ApartmentRepository apartmentRepository;
    private final ApartmentMapper apartmentMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ApartmentResource> getApartments(Pageable pageable) {
        return apartmentRepository.findAll(pageable)
                .map(apartmentMapper::mapApartmentToApartmentResource);
    }

    @Override
    @Transactional
    public void changeApartmentOwner(ChangeApartmentOwnerRequest changeApartmentOwnerRequest) {
        Apartment apartment = apartmentRepository.findByNumber(changeApartmentOwnerRequest.apartmentNumber()).orElseThrow();
        User user = userRepository.findByEmail(changeApartmentOwnerRequest.newOwnerEmail()).orElseThrow();
        apartment.setOwner(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApartmentResource> getApartmentsForCurrentUser() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return apartmentRepository.findAllByOwner(currentUser)
                .stream()
                .map(apartmentMapper::mapApartmentToApartmentResource)
                .toList();
    }

    @Override
    @Transactional
    public void createApartment(CreateApartmentRequest createApartmentRequest) {
        validateApartmentDoesntExist(createApartmentRequest.number());
        User owner = userRepository.findByEmail(createApartmentRequest.ownerEmail()).orElseThrow();
        Apartment apartment = apartmentMapper.mapCreateApartmentRequestToApartment(createApartmentRequest);
        apartment.setOwner(owner);
        apartmentRepository.save(apartment);
    }

    @Override
    @Transactional
    public void updateApartment(UpdateApartmentRequest updateApartmentRequest) {
        Apartment apartment = apartmentRepository.findByNumber(updateApartmentRequest.number()).orElseThrow();
        User owner = userRepository.findByEmail(updateApartmentRequest.ownerEmail()).orElseThrow();
        apartment.setOwner(owner);
        apartment.setSquareFootage(updateApartmentRequest.squareFootage());
        apartment.setNumber(updateApartmentRequest.number());
    }

    @Override
    public ApartmentResource getApartmentByNumber(int number) {
        Apartment apartment = apartmentRepository.findByNumber(number).orElseThrow();
        validateUserIsOwnerOfApartment(apartment);
        return apartmentMapper.mapApartmentToApartmentResource(apartment);
    }

    private void validateApartmentDoesntExist(int number) {
        if (apartmentRepository.existsByNumber(number)) {
            throw new IllegalArgumentException("Apartment with number " + number + " already exists");
        }
    }

    private void validateUserIsOwnerOfApartment(Apartment apartment) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.getRole().equals(ROLE_ADMIN)) {
            return;
        }
        if (!apartment.getOwner().equals(currentUser)) {
            throw new IllegalArgumentException("User is not owner of apartment with number " + apartment.getNumber());
        }
    }

}
