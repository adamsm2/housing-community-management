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

import java.time.Instant;
import java.util.concurrent.TimeUnit;

import static pl.adamsm2.backend.shared.utils.ApiEndpoints.USER_ENDPOINT;

@RestController
@RequestMapping(USER_ENDPOINT)
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UserController {

    private static final String ENDPOINTS_USING_REFRESH_TOKEN = "/users/token/";
    private final UserUseCases userUseCases;

    @GetMapping("/current")
    ResponseEntity<UserResource> getCurrentUserData() {
        return ResponseEntity.ok(userUseCases.getCurrentUserData());
    }

    @PostMapping("/register")
    ResponseEntity<Void> registerUser(@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        userUseCases.registerUser(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    ResponseEntity<AccessTokenResource> loginUser(@RequestBody @Valid LoginUserRequest loginUserRequest) {
        AuthResource authResource = userUseCases.loginUser(loginUserRequest);
        return getResponseWithTokens(authResource);
    }

    @PostMapping("/token/refreshToken")
    ResponseEntity<AccessTokenResource> refreshToken(@Parameter(hidden = true) @CookieValue(name = "refreshToken") String jwt) {
        AuthResource authResource;
        try {
            authResource = userUseCases.refreshToken(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).header(HttpHeaders.SET_COOKIE, getDeleteRefreshTokenCookie(jwt).toString()).build();
        }
        return getResponseWithTokens(authResource);
    }

    @PostMapping("/token/logout")
    ResponseEntity<Void> logoutUser(@Parameter(hidden = true) @CookieValue(name = "refreshToken") String jwt) {
        userUseCases.logoutUser(jwt);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, getDeleteRefreshTokenCookie(jwt).toString()).build();
    }

    @PostMapping("/verify")
    ResponseEntity<AccessTokenResource> verifyUserEmail(@RequestBody @Valid VerifyEmailRequest verifyEmailRequest) {
        AuthResource authResource = userUseCases.verifyEmail(verifyEmailRequest);
        return getResponseWithTokens(authResource);
    }

    @GetMapping("/verificationCode/expiration/{email}")
    ResponseEntity<Instant> getVerificationCodeExpirationDate(@PathVariable String email) {
        return ResponseEntity.ok(userUseCases.getVerificationCodeExpirationDate(email));
    }

    @PostMapping("/resend/verification")
    ResponseEntity<Void> resendVerificationEmail(@RequestBody @Valid ResendVerificationEmailRequest resendVerificationEmailRequest) {
        userUseCases.resendVerificationEmail(resendVerificationEmailRequest);
        return ResponseEntity.ok().build();
    }

    private ResponseCookie getRefreshTokenCookie(RefreshTokenResource refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken.jwt())
                .httpOnly(true)
                .path(ENDPOINTS_USING_REFRESH_TOKEN)
                .maxAge(TimeUnit.MILLISECONDS.toSeconds(refreshToken.expirationInMs()))
                .build();
    }

    private ResponseCookie getDeleteRefreshTokenCookie(String jwt) {
        return ResponseCookie.from("refreshToken", jwt)
                .httpOnly(true)
                .path(ENDPOINTS_USING_REFRESH_TOKEN)
                .maxAge(0)
                .build();
    }

    private ResponseEntity<AccessTokenResource> getResponseWithTokens(AuthResource tokenResource) {
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, getRefreshTokenCookie(tokenResource.refreshToken()).toString()).body(tokenResource.accessToken());
    }

}
