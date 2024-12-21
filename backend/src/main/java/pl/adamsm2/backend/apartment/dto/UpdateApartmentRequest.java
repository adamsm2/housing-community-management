package pl.adamsm2.backend.apartment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record UpdateApartmentRequest(
        @Positive int number,
        @Positive int squareFootage,
        @NotBlank @Email String ownerEmail
) {
}
