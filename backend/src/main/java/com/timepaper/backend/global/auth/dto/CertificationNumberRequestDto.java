package com.timepaper.backend.global.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificationNumberRequestDto {

  @NotBlank
  private String email;

  @NotBlank(message = "인증 코드는 필수입니다.")
  private String authenticationCode;

}
