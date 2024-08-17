package pl.adamsm2.backend.user.service.usecase.internal;

import pl.adamsm2.backend.user.domain.RefreshToken;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.RefreshTokenRepository;

import java.util.HashMap;
import java.util.Optional;

class InMemoryRefreshTokenRepository implements RefreshTokenRepository {

    private final HashMap<String, RefreshToken> repository = new HashMap<>();

    @Override
    public void delete(RefreshToken refreshToken) {
        repository.remove(refreshToken.getJwt());
    }

    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        return repository.put(refreshToken.getJwt(), refreshToken);
    }

    @Override
    public Optional<RefreshToken> findByUser(User user) {
        return repository.values().stream()
                .filter(refreshToken -> refreshToken.getUser().equals(user))
                .findFirst();
    }

    @Override
    public Optional<RefreshToken> findByJwt(String jwt) {
        return Optional.ofNullable(repository.get(jwt));
    }

    void clear() {
        repository.clear();
    }

}
