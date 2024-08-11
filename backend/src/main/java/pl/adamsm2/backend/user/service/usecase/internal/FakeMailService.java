package pl.adamsm2.backend.user.service.usecase.internal;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import pl.adamsm2.backend.user.domain.MailMessage;
import pl.adamsm2.backend.user.service.usecase.MailUseCases;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@ConditionalOnProperty(name = "email.sender.enabled", havingValue = "false", matchIfMissing = true)
@Slf4j
class FakeMailService implements MailUseCases {

    @Override
    public void send(String recipientEmail, MailMessage mailMessage) {
        log.info("Sending verification email to: {}", recipientEmail);
        log.info(mailMessage.getText());
    }

}
