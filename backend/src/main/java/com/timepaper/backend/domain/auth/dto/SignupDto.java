package com.timepaper.backend.domain.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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

  public User toEntity(SignupDto dto) {
    return User.builder()
        .email(dto.getEmail())
        .password(dto.getPassword())
        .isPrivacyPolicyAccepted(dto.isPrivacyPolicyAccepted())
        .isTermsAccepted(dto.isTermsAccepted()).build();
  }
}
