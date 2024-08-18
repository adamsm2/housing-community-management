package pl.adamsm2.backend.shared.utils;

import java.time.Clock;
import java.time.Instant;

public enum DateTimeProvider {
    INSTANCE;

    private final Clock realClock = Clock.systemUTC();
    private Clock clock = realClock;

    public Instant now() {
        return Instant.now(clock);
    }

    void setTime(Instant time) {
        this.clock = Clock.fixed(time, realClock.getZone());
    }

    void reset() {
        this.clock = realClock;
    }

}
