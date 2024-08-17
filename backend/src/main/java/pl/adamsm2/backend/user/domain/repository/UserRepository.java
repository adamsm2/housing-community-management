package pl.adamsm2.backend.user.domain.repository;

import pl.adamsm2.backend.user.domain.User;

import java.util.List;

public interface UserRepository extends UserRepositoryExtensions {

    User save(User user);

    List<User> findAll();

}
