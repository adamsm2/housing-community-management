package pl.adamsm2.backend.user.domain.repository.internal;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.UserRepository;
import pl.adamsm2.backend.user.domain.repository.UserRepositoryExtensions;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
class RelationalUserRepository implements UserRepository {

    private final JpaUserRepository jpaUserRepository;

    @Override
    public User save(User user) {
        return jpaUserRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return jpaUserRepository.findAll();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpaUserRepository.existsByEmail(email);
    }
}

interface JpaUserRepository extends JpaRepository<User, Long>, UserRepositoryExtensions {
}
