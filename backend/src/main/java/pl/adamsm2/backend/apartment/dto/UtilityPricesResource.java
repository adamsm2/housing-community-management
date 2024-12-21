package pl.adamsm2.backend.apartment.dto;

import lombok.Builder;

@Builder
public record UtilityPricesResource(
        int year,
        double waterPricePerUnit,
        double electricityPricePerUnit
) {
}
