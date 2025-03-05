package com.timepaper.backend.global.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class EmailCertificationRequestDto {

  @NotBlank(message = "이메일은 필수 입력입니다.")
  @Email
  private String email;
}
