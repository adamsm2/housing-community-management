package pl.adamsm2.backend.user.dto;

import lombok.Builder;

@Builder
public record TokenResource(
        String accessToken,
        String refreshToken
) {
}
