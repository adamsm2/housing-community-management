package pl.adamsm2.backend.user.service.usecase;

public interface MailUseCases {
    void sendVerificationEmail(String recipientEmailEmail, String code);
}
