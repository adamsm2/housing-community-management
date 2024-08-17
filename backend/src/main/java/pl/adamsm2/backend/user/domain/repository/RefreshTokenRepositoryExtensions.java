package pl.adamsm2.backend.user.domain.repository;

import pl.adamsm2.backend.user.domain.RefreshToken;
import pl.adamsm2.backend.user.domain.User;

import java.util.Optional;

public interface RefreshTokenRepositoryExtensions {

    Optional<RefreshToken> findByUser(User user);

    Optional<RefreshToken> findByJwt(String jwt);

}
