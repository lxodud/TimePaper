package com.timepaper.backend.global.auth.token.util;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RefreshTokenUtil {

  private final PasswordEncoder passwordEncoder;
  private final SecureRandom secureRandom = new SecureRandom();

  public String createRefreshToken(String email) {

    String emailKey = encodeEmailToKey(email);

    byte[] tokenBytes = new byte[16];
    secureRandom.nextBytes(tokenBytes);
    String randomToken = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

    return String.format("%s-%s", emailKey, randomToken);
  }

  public String hashToken(String refreshToken) {
    return passwordEncoder.encode(refreshToken);
  }

  public boolean validateRefreshToken(String rawRefreshToken, String hashedRefreshToken) {
    return passwordEncoder.matches(rawRefreshToken, hashedRefreshToken);
  }

  public String encodeEmailToKey(String email) {
    return Base64.getUrlEncoder().withoutPadding()
        .encodeToString(email.getBytes(StandardCharsets.UTF_8));
  }


}
