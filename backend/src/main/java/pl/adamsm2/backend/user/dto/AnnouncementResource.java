package pl.adamsm2.backend.user.dto;

import lombok.Builder;

@Builder
public record AnnouncementResource(
        String title,
        String content
) {
}
