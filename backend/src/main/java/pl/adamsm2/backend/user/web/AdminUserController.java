package pl.adamsm2.backend.user.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.user.dto.UserResource;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

import java.util.Collection;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.ADMIN_ENDPOINT;
import static pl.adamsm2.backend.shared.utils.ApiEndpoints.USER_ENDPOINT;

@RestController
@RequestMapping(ADMIN_ENDPOINT + USER_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class AdminUserController {

    private final UserUseCases userUseCases;

    @GetMapping
    ResponseEntity<Collection<UserResource>> getUsers() {
        return ResponseEntity.ok(userUseCases.getUsers());
    }

}
