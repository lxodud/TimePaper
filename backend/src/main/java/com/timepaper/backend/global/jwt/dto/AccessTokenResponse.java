package com.timepaper.backend.global.jwt.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccessTokenResponse {

  private final String accessToken;

  public static AccessTokenResponse from(String accessToken) {
    return AccessTokenResponse.builder()
        .accessToken(accessToken)
        .build();
  }

}
