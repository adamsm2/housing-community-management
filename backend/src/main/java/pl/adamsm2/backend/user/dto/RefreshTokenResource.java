package pl.adamsm2.backend.user.dto;

public record RefreshTokenResource(
        String jwt,
        long expirationInMs
) {
}
