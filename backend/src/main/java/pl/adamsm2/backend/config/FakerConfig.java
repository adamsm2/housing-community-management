package pl.adamsm2.backend.config;

import com.github.javafaker.Faker;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
public class FakerConfig {

    private static final long SEED = 123L;

    @Bean
    public Faker faker() {
        final var random = new Random(SEED);
        return new Faker(random);
    }

}
