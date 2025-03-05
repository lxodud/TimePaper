package com.timepaper.backend.global.exception.custom.auth;

import com.timepaper.backend.global.exception.ErrorCode;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class LoginValidationException extends AuthenticationException {

  private final ErrorCode errorCode;

  public LoginValidationException() {
    super(ErrorCode.EMAIL_PASSWORD_REQUIRED.getMessage());
    this.errorCode = ErrorCode.EMAIL_PASSWORD_REQUIRED;
  }
}
