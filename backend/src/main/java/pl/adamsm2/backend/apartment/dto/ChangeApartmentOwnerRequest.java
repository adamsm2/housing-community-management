package pl.adamsm2.backend.apartment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ChangeApartmentOwnerRequest(
        @PositiveOrZero int apartmentNumber,
        @NotBlank @Size(max = 100) @Email String newOwnerEmail
) {
}
