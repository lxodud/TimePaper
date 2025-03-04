package com.timepaper.backend.global.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class EmailCertificationRequestDto {

  @NotBlank
  @Email
  private String email;
}
