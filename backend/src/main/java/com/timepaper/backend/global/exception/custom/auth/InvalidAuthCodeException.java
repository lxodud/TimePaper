package com.timepaper.backend.global.exception.custom.auth;

import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.common.GlobalException;

public class InvalidAuthCodeException extends GlobalException {

  public InvalidAuthCodeException() {
    super(ErrorCode.INVALID_AUTH_CODE);
  }
}
