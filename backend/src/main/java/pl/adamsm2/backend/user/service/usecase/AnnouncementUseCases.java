package pl.adamsm2.backend.user.service.usecase;

import pl.adamsm2.backend.user.dto.AnnouncementResource;
import pl.adamsm2.backend.user.dto.CreateAnnouncementRequest;

import java.util.Collection;

public interface AnnouncementUseCases {
    void createAnnouncement(CreateAnnouncementRequest createAnnouncementRequest);

    Collection<AnnouncementResource> getAnnouncements();
}
