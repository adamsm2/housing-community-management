package pl.adamsm2.backend.apartment.domain;

import jakarta.persistence.*;
import lombok.*;
import pl.adamsm2.backend.user.domain.User;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private long id;

    @EqualsAndHashCode.Exclude
    @ManyToOne
    private User owner;

    @Column(nullable = false, unique = true)
    private int number;

    @Column(nullable = false)
    private int squareFootage;


}
