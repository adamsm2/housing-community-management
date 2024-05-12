package pl.adamsm2.backend.user.web;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.adamsm2.backend.user.dto.*;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UserController {

    private final UserUseCases userUseCases;

    private static final String REFRESH_TOKEN_ENDPOINT = "/users/refreshToken";

    @GetMapping
    ResponseEntity<Collection<UserResource>> getUsers() {
        return ResponseEntity.ok(userUseCases.getUsers());
    }

    @PostMapping("/register")
    ResponseEntity<Void> registerUser(@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        userUseCases.registerUser(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    ResponseEntity<TokenDetailsResource> loginUser(@RequestBody @Valid LoginUserRequest loginUserRequest) {
        return getResponseWithTokens(userUseCases.loginUser(loginUserRequest));
    }

    @PostMapping("/refreshToken")
    ResponseEntity<TokenDetailsResource> refreshToken(@Parameter(hidden = true) @CookieValue(name = "refreshToken") String refreshToken) {
        return getResponseWithTokens(userUseCases.refreshToken(refreshToken));
    }

    private ResponseCookie createRefreshTokenCookie(TokenResource tokenResource) {
        return ResponseCookie.from("refreshToken", tokenResource.refreshToken().token())
                .httpOnly(true)
                .path(REFRESH_TOKEN_ENDPOINT)
                .maxAge(TimeUnit.MILLISECONDS.toSeconds(tokenResource.refreshToken().expiration()))
                .build();
    }

    private ResponseEntity<TokenDetailsResource> getResponseWithTokens(TokenResource tokenResource) {
        ResponseCookie refreshTokenCookie = createRefreshTokenCookie(tokenResource);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString()).body(tokenResource.accessToken());
    }

}
