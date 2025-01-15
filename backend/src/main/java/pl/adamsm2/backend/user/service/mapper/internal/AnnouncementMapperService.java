package pl.adamsm2.backend.user.service.mapper.internal;

import org.springframework.stereotype.Component;
import pl.adamsm2.backend.user.domain.Announcement;
import pl.adamsm2.backend.user.dto.AnnouncementResource;
import pl.adamsm2.backend.user.dto.CreateAnnouncementRequest;
import pl.adamsm2.backend.user.service.mapper.AnnouncementMapper;

@Component
class AnnouncementMapperService implements AnnouncementMapper {

    @Override
    public Announcement mapCreateAnnouncementRequestToAnnouncement(CreateAnnouncementRequest createAnnouncementRequest) {
        return Announcement.builder()
                .content(createAnnouncementRequest.content())
                .title(createAnnouncementRequest.title())
                .build();
    }

    @Override
    public AnnouncementResource mapAnnouncementToAnnouncementResource(Announcement announcement) {
        return AnnouncementResource.builder()
                .title(announcement.getTitle())
                .content(announcement.getContent())
                .build();
    }
}
