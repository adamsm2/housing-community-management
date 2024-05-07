package pl.adamsm2.backend.user.dto;

import lombok.Builder;

@Builder
public record UserResource(
        String email
) {
}
