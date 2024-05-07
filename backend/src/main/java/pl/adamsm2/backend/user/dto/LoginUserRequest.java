package pl.adamsm2.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginUserRequest(
        @NotBlank @Size(max = 255) @Email String email,
        @NotBlank @Size(min = 8, max = 255) String password
) {
}
