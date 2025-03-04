package com.timepaper.backend.global.emailsender;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component  // Spring Bean 등록
@RequiredArgsConstructor
public class EmailSendManager {

  private final JavaMailSender javaMailSender;

  public void sendEmail(String email, String title, String content) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject(title);
    message.setText(content);

    javaMailSender.send(message);  // 이메일 전송
  }
}
