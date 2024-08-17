package pl.adamsm2.backend.user.domain.repository.internal;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.user.domain.RefreshToken;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.RefreshTokenRepository;
import pl.adamsm2.backend.user.domain.repository.RefreshTokenRepositoryExtensions;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
class RelationalRefreshTokenRepository implements RefreshTokenRepository {

    private final JpaRefreshTokenRepository jpaRefreshTokenRepository;

    @Override
    public void delete(RefreshToken refreshToken) {
        jpaRefreshTokenRepository.delete(refreshToken);
    }

    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        return jpaRefreshTokenRepository.save(refreshToken);
    }

    @Override
    public Optional<RefreshToken> findByUser(User user) {
        return jpaRefreshTokenRepository.findByUser(user);
    }

    @Override
    public Optional<RefreshToken> findByJwt(String jwt) {
        return jpaRefreshTokenRepository.findByJwt(jwt);
    }
}

interface JpaRefreshTokenRepository extends JpaRepository<RefreshToken, Long>, RefreshTokenRepositoryExtensions {
}