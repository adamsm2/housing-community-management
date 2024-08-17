package pl.adamsm2.backend.user.domain.repository;

import pl.adamsm2.backend.user.domain.User;

import java.util.Optional;

public interface UserRepositoryExtensions {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    
}
