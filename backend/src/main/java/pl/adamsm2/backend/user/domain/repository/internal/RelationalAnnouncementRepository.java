package pl.adamsm2.backend.user.domain.repository.internal;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.user.domain.Announcement;
import pl.adamsm2.backend.user.domain.repository.AnnouncementRepository;
import pl.adamsm2.backend.user.domain.repository.AnnouncementRepositoryExtensions;

import java.util.Collection;

@Repository
@RequiredArgsConstructor
class RelationalAnnouncementRepository implements AnnouncementRepository {

    private final JpaAnnouncementRepository jpaAnnouncementRepository;

    @Override
    public Announcement save(Announcement announcement) {
        return jpaAnnouncementRepository.save(announcement);
    }

    @Override
    public Collection<Announcement> getAnnouncements() {
        return jpaAnnouncementRepository.findAll();
    }

    @Override
    public boolean existsByTitle(String title) {
        return jpaAnnouncementRepository.existsByTitle(title);
    }
}

interface JpaAnnouncementRepository extends JpaRepository<Announcement, Long>, AnnouncementRepositoryExtensions {
}


