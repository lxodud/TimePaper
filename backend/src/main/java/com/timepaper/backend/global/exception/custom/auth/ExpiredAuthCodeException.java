package com.timepaper.backend.global.exception.custom.auth;

import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.common.GlobalException;

public class ExpiredAuthCodeException extends GlobalException {

  public ExpiredAuthCodeException() {
    super(ErrorCode.EXPIRED_AUTH_CODE);
  }
}
