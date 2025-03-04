package com.timepaper.backend.global.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.timepaper.backend.domain.user.entity.ROLE;
import com.timepaper.backend.domain.user.entity.User;
import lombok.Getter;

@Getter
public class SignupDto {

  private String email;
  private String password;
  @JsonProperty("isPrivacyPolicyAccepted")
  private boolean isPrivacyPolicyAccepted;

  @JsonProperty("isTermsAccepted")
  private boolean isTermsAccepted;

  public User toEntity(String encodedPassword) {
    return User.builder()
        .email(email)
        .password(encodedPassword)
        .isPrivacyPolicyAccepted(isPrivacyPolicyAccepted())
        .isTermsAccepted(isTermsAccepted())
        .role(ROLE.ROLE_USER)
        .build();
  }
}
