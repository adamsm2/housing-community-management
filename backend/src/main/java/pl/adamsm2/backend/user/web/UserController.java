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

    private static final String ENDPOINTS_USING_REFRESH_TOKEN = "/users/token/";

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

    @PostMapping("/token/refreshToken")
    ResponseEntity<TokenDetailsResource> refreshToken(@Parameter(hidden = true) @CookieValue(name = "refreshToken") String jwt) {
        return getResponseWithTokens(userUseCases.refreshToken(jwt));
    }

    @PostMapping("/token/logout")
    ResponseEntity<Void> logoutUser(@Parameter(hidden = true) @CookieValue(name = "refreshToken") String jwt) {
        userUseCases.logoutUser(jwt);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, getDeleteRefreshTokenCookie(jwt).toString()).build();
    }

    private ResponseCookie getRefreshTokenCookie(TokenResource tokenResource) {
        return ResponseCookie.from("refreshToken", tokenResource.refreshToken().jwt())
                .httpOnly(true)
                .path(ENDPOINTS_USING_REFRESH_TOKEN)
                .maxAge(TimeUnit.MILLISECONDS.toSeconds(tokenResource.refreshToken().expiration()))
                .build();
    }

    private ResponseCookie getDeleteRefreshTokenCookie(String jwt) {
        return ResponseCookie.from("refreshToken", jwt)
                .httpOnly(true)
                .path(ENDPOINTS_USING_REFRESH_TOKEN)
                .maxAge(0)
                .build();
    }

    private ResponseEntity<TokenDetailsResource> getResponseWithTokens(TokenResource tokenResource) {
        ResponseCookie refreshTokenCookie = getRefreshTokenCookie(tokenResource);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString()).body(tokenResource.accessToken());
    }

}
