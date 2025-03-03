package com.timepaper.backend.global.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class EmailCertificationRequestDto {

  @NotBlank
  private String email;
}
