package pl.adamsm2.backend.apartment.dto;

import lombok.Builder;

@Builder
public record ApartmentResource(
        int number,
        int squareFootage,
        String ownerEmail
) {
}
