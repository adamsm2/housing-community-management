package pl.adamsm2.backend.user.service.usecase.internal;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pl.adamsm2.backend.user.service.usecase.MailUseCases;

@Service
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
class MailService implements MailUseCases {

    private static final String VERIFICATION_EMAIL_SUBJECT = "Verification email";
    private final JavaMailSender mailSender;

    @Override
    public void sendVerificationEmail(String recipientEmail, String code) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = getHtmlMsg(code);
        try {
            helper.setText(htmlMsg, true);
            helper.setTo(recipientEmail);
            helper.setSubject(VERIFICATION_EMAIL_SUBJECT);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email ", e);
        }
    }

    private String getHtmlMsg(String code) {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "    <title></title>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <h1>Your verification code: " + code + "</h1>\n" +
                "    <h2>This code will expire in 10 minutes.</h2>\n" +
                "</body>\n" +
                "</html>";
    }
}
