package pl.adamsm2.backend.user.dto;

import lombok.Builder;

@Builder
public record AuthResource(
        AccessTokenResource accessToken,
        RefreshTokenResource refreshToken
) {
}
