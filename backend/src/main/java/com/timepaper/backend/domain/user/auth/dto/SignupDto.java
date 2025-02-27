package com.timepaper.backend.domain.user.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.timepaper.backend.domain.user.auth.entity.Auth;
import lombok.Getter;

@Getter
public class SignupDto {

  private String email;
  private String password;
  @JsonProperty("isPrivacyPolicyAccepted")
  private boolean isPrivacyPolicyAccepted;
  @JsonProperty("isTermsAccepted")
  private boolean isTermsAccepted;

  public Auth toEntity(SignupDto dto) {
    return Auth.builder()
        .email(dto.getEmail())
        .password(dto.getPassword())
        .isPrivacyPolicyAccepted(dto.isPrivacyPolicyAccepted())
        .isTermsAccepted(dto.isTermsAccepted())
        .isEmailConsent(false).build();
  }
}
