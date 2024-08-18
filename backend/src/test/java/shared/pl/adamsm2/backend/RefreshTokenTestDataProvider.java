package pl.adamsm2.backend;

import pl.adamsm2.backend.user.domain.RefreshToken;
import pl.adamsm2.backend.user.domain.Token;
import pl.adamsm2.backend.user.domain.User;

import java.time.Instant;

public class RefreshTokenTestDataProvider {

    public static RefreshToken getRefreshToken(Token token, User user) {
        return RefreshToken.builder()
                .jwt(token.getJwt())
                .expiryDate(Instant.now().plusMillis(token.getExpirationInMs()))
                .user(user)
                .build();
    }

}
