package pl.adamsm2.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PropertiesConfig {

    @Value("${pepper.value}")
    private String pepper;
    
    @Bean
    public String pepper() {
        return pepper;
    }

}
