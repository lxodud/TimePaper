package com.timepaper.backend.domain.javaemail;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JavaEmailDto {

  private String email;
  private String title;
  private String message;

  public JavaEmailDto(String email, String title, String message) {
    this.email = email;
    this.title = title;
    this.message = message;
  }
}
