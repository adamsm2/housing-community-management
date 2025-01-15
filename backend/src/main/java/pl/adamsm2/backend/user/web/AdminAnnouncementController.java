package pl.adamsm2.backend.user.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.user.dto.CreateAnnouncementRequest;
import pl.adamsm2.backend.user.service.usecase.AnnouncementUseCases;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.ADMIN_ENDPOINT;
import static pl.adamsm2.backend.shared.utils.ApiEndpoints.ANNOUNCEMENT_ENDPOINT;

@RestController
@RequestMapping(ADMIN_ENDPOINT + ANNOUNCEMENT_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class AdminAnnouncementController {

    private final AnnouncementUseCases announcementUseCases;

    @PostMapping
    ResponseEntity<Void> createAnnouncement(@RequestBody CreateAnnouncementRequest createAnnouncementRequest) {
        announcementUseCases.createAnnouncement(createAnnouncementRequest);
        return ResponseEntity.ok().build();
    }

}
