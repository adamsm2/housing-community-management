package pl.adamsm2.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record VerifyEmailRequest(
        @NotBlank @Size(max = 100) @Email String email,
        @NotBlank @Size(min = 6, max = 6) String code
) {
}
