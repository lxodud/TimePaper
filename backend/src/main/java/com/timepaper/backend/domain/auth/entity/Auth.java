package com.timepaper.backend.domain.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@RequiredArgsConstructor
@Getter
@Builder
public class Auth {

  @Id
  private String email;

  @Length(min = 8)
  private String password;

  private boolean isPrivacyPolicyAccepted; // 개인정보 동의
  private boolean isTermsAccepted; //이용 약관 동의
  private boolean isEmailConsent; //이메일 활용 동의

  public Auth(String email,
      String password,
      boolean isPrivacyPolicyAccepted,
      boolean isTermsAccepted,
      boolean isEmailConsent) {
    this.email = email;
    this.password = password;
    this.isPrivacyPolicyAccepted = isPrivacyPolicyAccepted;
    this.isTermsAccepted = isTermsAccepted;
    this.isEmailConsent = isEmailConsent;
  }

}
