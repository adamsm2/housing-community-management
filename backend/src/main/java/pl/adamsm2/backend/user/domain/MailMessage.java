package pl.adamsm2.backend.user.domain;

import lombok.NonNull;
import lombok.Value;

@Value
public class MailMessage {

    String subject;
    String text;

    public MailMessage(@NonNull String subject, @NonNull String text) {
        this.subject = subject;
        this.text = text;
    }

}
