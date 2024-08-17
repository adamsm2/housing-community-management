package pl.adamsm2.backend.user.domain.repository;

import pl.adamsm2.backend.user.domain.RefreshToken;

public interface RefreshTokenRepository extends RefreshTokenRepositoryExtensions {

    void delete(RefreshToken refreshToken);

    RefreshToken save(RefreshToken refreshToken);

}
