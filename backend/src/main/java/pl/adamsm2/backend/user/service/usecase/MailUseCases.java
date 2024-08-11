package pl.adamsm2.backend.user.service.usecase;


import pl.adamsm2.backend.user.domain.MailMessage;

public interface MailUseCases {

    void send(String recipientEmail, MailMessage mailMessage);

}
