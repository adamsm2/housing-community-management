package pl.adamsm2.backend.user.domain;

import lombok.Value;

@Value
public class Token {

    String jwt;
    long expirationInMs;

}
