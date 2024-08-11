package pl.adamsm2.backend.user.service.usecase.internal;

import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pl.adamsm2.backend.user.domain.MailMessage;
import pl.adamsm2.backend.user.service.usecase.MailUseCases;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@ConditionalOnProperty(name = "email.sender.enabled", havingValue = "true")
class MailService implements MailUseCases {
    
    private final JavaMailSender mailSender;

    @Override
    public void send(@NonNull String recipientEmail, @NonNull MailMessage mailMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject(mailMessage.getSubject());
        message.setText(mailMessage.getText());
        mailSender.send(message);
    }

}
