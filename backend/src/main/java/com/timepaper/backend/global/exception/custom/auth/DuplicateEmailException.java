package com.timepaper.backend.global.exception.custom.auth;

import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.common.GlobalException;

public class DuplicateEmailException extends GlobalException {

  public DuplicateEmailException() {
    super(ErrorCode.DUPLICATE_EMAIL);
  }
}
