package pl.adamsm2.backend.user.dto;

public record LoginUserResource(
        TokenDetailsResource accessToken,
        UserDataResource userData
) {
}
