package pl.adamsm2.backend.user.dto;

public record TokenDetailsResource(
        String token,
        long expiration
) {
}
