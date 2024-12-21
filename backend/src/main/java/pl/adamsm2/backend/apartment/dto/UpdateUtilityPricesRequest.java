package pl.adamsm2.backend.apartment.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;

public record UpdateUtilityPricesRequest(
        @Positive double electricityPricePerUnit,
        @Positive double waterPricePerUnit,
        @Min(2000) @Max(2100) int year
) {
}
