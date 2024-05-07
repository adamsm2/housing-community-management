package pl.adamsm2.backend.user.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.adamsm2.backend.user.dto.LoginUserRequest;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;
import pl.adamsm2.backend.user.dto.TokenResource;
import pl.adamsm2.backend.user.dto.UserResource;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

import java.util.Collection;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UserController {

    private final UserUseCases userUseCases;

    @GetMapping
    ResponseEntity<Collection<UserResource>> getUsers() {
        return ResponseEntity.ok(userUseCases.getUsers());
    }

    @PostMapping("/register")
    ResponseEntity<Void> registerUser(@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        userUseCases.registerUser(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    ResponseEntity<TokenResource> loginUser(@RequestBody @Valid LoginUserRequest loginUserRequest) {
        return ResponseEntity.ok(userUseCases.loginUser(loginUserRequest));
    }
}
