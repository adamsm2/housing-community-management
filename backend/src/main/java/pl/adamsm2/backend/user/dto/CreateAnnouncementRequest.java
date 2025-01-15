package pl.adamsm2.backend.user.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;

public record CreateAnnouncementRequest(
        @NotBlank @Max(256) String title,
        @NotBlank @Max(10000) String content
) {
}
