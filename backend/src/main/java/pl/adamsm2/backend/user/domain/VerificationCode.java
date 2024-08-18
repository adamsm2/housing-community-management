package pl.adamsm2.backend.user.domain;

import jakarta.persistence.Embeddable;
import lombok.Value;
import pl.adamsm2.backend.shared.utils.DateTimeProvider;

import java.security.SecureRandom;
import java.time.Instant;

@Value
@Embeddable
public class VerificationCode {

    String code;
    Instant expirationDate;
    private static final long VERIFICATION_CODE_EXPIRATION_SECONDS = 600;
    private static final int VERIFICATION_CODE_LENGTH = 6;

    public VerificationCode() {
        this.code = generateRandomCode();
        this.expirationDate = DateTimeProvider.INSTANCE.now().plusSeconds(VERIFICATION_CODE_EXPIRATION_SECONDS);
    }

    public boolean isExpired() {
        return expirationDate.isBefore(DateTimeProvider.INSTANCE.now());
    }

    private String generateRandomCode() {
        StringBuilder sb = new StringBuilder();
        SecureRandom random = new SecureRandom();
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (int i = 0; i < VERIFICATION_CODE_LENGTH; i++) {
            int index = random.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

}
