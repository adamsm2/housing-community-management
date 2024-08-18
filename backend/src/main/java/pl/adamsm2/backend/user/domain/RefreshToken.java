package pl.adamsm2.backend.user.domain;

import jakarta.persistence.*;
import lombok.*;
import pl.adamsm2.backend.shared.utils.DateTimeProvider;

import java.time.Instant;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private long id;

    @Column(nullable = false, unique = true, length = 1024)
    String jwt;

    @Column(nullable = false)
    Instant expiryDate;

    @OneToOne
    private User user;

    public boolean isExpired() {
        return expiryDate.isBefore(DateTimeProvider.INSTANCE.now());
    }

}
