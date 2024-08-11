package pl.adamsm2.backend.shared.exception;

public class UserEmailNotVerifiedException extends RuntimeException {

    public UserEmailNotVerifiedException(String message) {
        super(message);
    }
}
