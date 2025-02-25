package com.timepaper.backend.global.auth.token.entity;

import java.time.Instant;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

@Builder
@AllArgsConstructor
@Getter
public class RefreshTokenInfo {

  private String email;
  private String role;
  private String hashedRefreshToken;
  private Instant lastIssued;

  public static RefreshTokenInfo from(Authentication authentication, String hashedRefreshToken) {
    return RefreshTokenInfo.builder()
        .email(authentication.getName())
        .role(authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(",")))
        .hashedRefreshToken(hashedRefreshToken)
        .lastIssued(Instant.now())
        .build();
  }

}
