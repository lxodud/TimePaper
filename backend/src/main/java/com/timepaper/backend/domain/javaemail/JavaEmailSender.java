package com.timepaper.backend.domain.javaemail;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service  // Spring Bean 등록
@RequiredArgsConstructor
public class JavaEmailSender {

  private final JavaMailSender javaMailSender;

  public void sendJavaEmail(JavaEmailDto dto) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(dto.getEmail());
    message.setSubject(dto.getTitle());
    message.setText(dto.getMessage());

    javaMailSender.send(message);  // 이메일 전송
  }
}
