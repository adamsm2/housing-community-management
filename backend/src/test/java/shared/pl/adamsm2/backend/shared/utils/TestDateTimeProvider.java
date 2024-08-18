package pl.adamsm2.backend.shared.utils;

import java.time.Instant;

public class TestDateTimeProvider {

    public static void setTime(Instant time) {
        DateTimeProvider.INSTANCE.setTime(time);
    }

    public static void reset() {
        DateTimeProvider.INSTANCE.reset();
    }

    public static Instant now() {
        return DateTimeProvider.INSTANCE.now();
    }

}
