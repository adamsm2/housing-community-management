package pl.adamsm2.backend.user.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.user.dto.AnnouncementResource;
import pl.adamsm2.backend.user.service.usecase.AnnouncementUseCases;

import java.util.Collection;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.ANNOUNCEMENT_ENDPOINT;
import static pl.adamsm2.backend.shared.utils.ApiEndpoints.USER_ENDPOINT;

@RestController
@RequestMapping(USER_ENDPOINT + ANNOUNCEMENT_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class AnnouncementController {

    private final AnnouncementUseCases announcementUseCases;

    @GetMapping
    ResponseEntity<Collection<AnnouncementResource>> getAnnouncements() {
        return ResponseEntity.ok(announcementUseCases.getAnnouncements());
    }
}
