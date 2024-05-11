package pl.adamsm2.backend.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.user.domain.User;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtUtils {

    public String createJwt(User user, String secret, long expiration) {
        return createJwtFromUsername(user.getEmail(), secret, expiration);
    }

    private String createJwtFromUsername(String username, String secret, long expiration) {
        Instant now = Instant.now();
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(Date.from(now.plusMillis(expiration)))
                .signWith(key)
                .compact();
    }
}
