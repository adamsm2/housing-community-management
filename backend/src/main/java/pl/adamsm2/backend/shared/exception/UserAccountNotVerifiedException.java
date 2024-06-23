package pl.adamsm2.backend.shared.exception;

public class UserAccountNotVerifiedException extends RuntimeException {

    public UserAccountNotVerifiedException(String message) {
        super(message);
    }
}
