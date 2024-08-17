package pl.adamsm2.backend.user.service.usecase.internal;

import pl.adamsm2.backend.user.domain.User;
import pl.adamsm2.backend.user.domain.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

class InMemoryUserRepository implements UserRepository {

    private final HashMap<String, User> repository = new HashMap<>();

    @Override
    public User save(User user) {
        return repository.put(user.getEmail(), user);
    }

    @Override
    public List<User> findAll() {
        return repository.values().stream().toList();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(repository.get(email));
    }

    @Override
    public boolean existsByEmail(String email) {
        return repository.containsKey(email);
    }

    void clear() {
        repository.clear();
    }

}
