package pl.adamsm2.backend.apartment.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeterReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private long id;

    @ManyToOne
    @JoinColumn(name = "number")
    private Apartment apartment;

    @EqualsAndHashCode.Exclude
    private double waterMeterReading;

    @EqualsAndHashCode.Exclude
    private double electricityMeterReading;

    private int month;

    private int year;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EPaymentStatus paymentStatus;
}
