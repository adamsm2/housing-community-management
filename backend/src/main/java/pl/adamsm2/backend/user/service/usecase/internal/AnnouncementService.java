package pl.adamsm2.backend.user.service.usecase.internal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adamsm2.backend.user.domain.repository.AnnouncementRepository;
import pl.adamsm2.backend.user.dto.AnnouncementResource;
import pl.adamsm2.backend.user.dto.CreateAnnouncementRequest;
import pl.adamsm2.backend.user.service.mapper.AnnouncementMapper;
import pl.adamsm2.backend.user.service.usecase.AnnouncementUseCases;

import java.util.Collection;

@Service
@RequiredArgsConstructor
class AnnouncementService implements AnnouncementUseCases {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    public void createAnnouncement(CreateAnnouncementRequest createAnnouncementRequest) {
        validateAnnouncementDoesntExist(createAnnouncementRequest.title());
        announcementRepository.save(
                announcementMapper.mapCreateAnnouncementRequestToAnnouncement(createAnnouncementRequest)
        );
    }

    @Override
    public Collection<AnnouncementResource> getAnnouncements() {
        return announcementRepository.getAnnouncements().stream().
                map(announcementMapper::mapAnnouncementToAnnouncementResource)
                .toList();
    }

    private void validateAnnouncementDoesntExist(String title) {
        if (announcementRepository.existsByTitle(title)) {
            throw new IllegalArgumentException("Announcement with given title already exists");
        }
    }
}
