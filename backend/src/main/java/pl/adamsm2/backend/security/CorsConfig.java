package pl.adamsm2.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    private static final String MATCH_ALL_PATTERN = "/**";
    private static final List<String> ALLOWED_METHODS = List.of("GET", "POST", "DELETE", "PATCH", "OPTIONS");
    private static final List<String> ALLOW_ALL_WILDCARD = List.of("*");

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final var corsConfiguration = createCorsConfiguration();
        return createCorsConfigurationSource(corsConfiguration);
    }

    private CorsConfiguration createCorsConfiguration() {
        final var corsConfiguration = new CorsConfiguration();
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        corsConfiguration.setAllowedOriginPatterns(origins);
        corsConfiguration.setAllowedMethods(ALLOWED_METHODS);
        corsConfiguration.setAllowedHeaders(ALLOW_ALL_WILDCARD);
        corsConfiguration.setAllowCredentials(true);
        return corsConfiguration;
    }

    private CorsConfigurationSource createCorsConfigurationSource(CorsConfiguration corsConfiguration) {
        final var corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration(MATCH_ALL_PATTERN, corsConfiguration);
        return corsConfigurationSource;
    }

}
