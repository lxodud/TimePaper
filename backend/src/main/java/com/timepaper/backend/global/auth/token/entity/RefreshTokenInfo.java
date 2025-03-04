package com.timepaper.backend.global.auth.token.entity;

import java.time.Instant;
import java.util.List;
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
  private List<String> roles;
  private String hashedRefreshToken;
  private Instant lastIssued;

  public static RefreshTokenInfo from(Authentication authentication, String hashedRefreshToken) {
    return RefreshTokenInfo.builder()
        .email(authentication.getName())
        .roles(authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList()))
        .hashedRefreshToken(hashedRefreshToken)
        .lastIssued(Instant.now())
        .build();
  }

}
