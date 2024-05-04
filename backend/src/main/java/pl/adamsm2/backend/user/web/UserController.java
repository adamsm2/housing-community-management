package pl.adamsm2.backend.user.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adamsm2.backend.user.dto.RegisterUserRequest;
import pl.adamsm2.backend.user.service.usecase.UserUseCases;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class UserController {

    private final UserUseCases userUseCases;

    @PostMapping("/register")
    ResponseEntity<Void> registerUser(@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        userUseCases.registerUser(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
