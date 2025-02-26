package com.timepaper.backend.global.auth.token.util;

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

  public String createRefreshToken() {
    byte[] tokenBytes = new byte[16];
    secureRandom.nextBytes(tokenBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
  }

  public String hashToken(String refreshToken) {
    return passwordEncoder.encode(refreshToken);
  }

  public boolean validateRefreshToken(String rawRefreshToken, String hashedRefreshToken) {
    return passwordEncoder.matches(rawRefreshToken, hashedRefreshToken);
  }


}
