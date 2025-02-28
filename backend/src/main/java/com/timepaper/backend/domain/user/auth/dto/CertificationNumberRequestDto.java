package com.timepaper.backend.domain.user.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificationNumberRequestDto {

  @NotBlank
  private String email;

  @NotBlank
  private String checkNum;

}
