package pl.adamsm2.backend.user.domain.repository;

import pl.adamsm2.backend.user.domain.Announcement;

import java.util.Collection;

public interface AnnouncementRepository extends AnnouncementRepositoryExtensions {
    Announcement save(Announcement announcement);

    Collection<Announcement> getAnnouncements();
}
