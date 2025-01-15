package pl.adamsm2.backend.user.service.mapper;

import pl.adamsm2.backend.user.domain.Announcement;
import pl.adamsm2.backend.user.dto.AnnouncementResource;
import pl.adamsm2.backend.user.dto.CreateAnnouncementRequest;

public interface AnnouncementMapper {
    Announcement mapCreateAnnouncementRequestToAnnouncement(CreateAnnouncementRequest createAnnouncementRequest);

    AnnouncementResource mapAnnouncementToAnnouncementResource(Announcement announcement);
}
