package com.timepaper.backend.global.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.timepaper.backend.domain.user.entity.ROLE;
import com.timepaper.backend.domain.user.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class SignupRequestDto {

  @Email(message = "이메일 형식이 틀렸습니다.")
  private String email;

  @Pattern(regexp = "^(?=.*[!@#$%^&*]).{8,}$")
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
