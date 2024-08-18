package pl.adamsm2.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import pl.adamsm2.backend.security.JwtUtils;
import pl.adamsm2.backend.shared.utils.TestDateTimeProvider;
import pl.adamsm2.backend.user.domain.RefreshToken;
import pl.adamsm2.backend.user.domain.Token;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.RefreshTokenRepository;
import pl.adamsm2.backend.user.domain.repository.UserRepository;

import java.time.Instant;

import static pl.adamsm2.backend.RefreshTokenTestDataProvider.getRefreshToken;
import static pl.adamsm2.backend.UserTestDataProvider.getSampleUser;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserModuleTest {

    private static final String REFRESH_TOKEN_URI = "/users/token/refreshToken";

    @Autowired
    WebTestClient client;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Value("${app.jwt.refresh-expiration}")
    long refreshTokenExpirationInMs;

    @Test
    void givenExpiredRefreshToken_whenRefreshToken_thenReturnBadRequest() {
        // given
        User user = userRepository.save(getSampleUser());
        Token token = jwtUtils.createRefreshToken(user);
        RefreshToken refreshToken = getRefreshToken(token, user);
        refreshTokenRepository.save(refreshToken);

        Instant currentTime = TestDateTimeProvider.now();
        TestDateTimeProvider.setTime(currentTime.plusMillis(refreshTokenExpirationInMs + 1));

        // when then
        client.post().uri(REFRESH_TOKEN_URI)
                .cookie("refreshToken", refreshToken.getJwt())
                .exchange()
                .expectStatus().isBadRequest();
    }

}
