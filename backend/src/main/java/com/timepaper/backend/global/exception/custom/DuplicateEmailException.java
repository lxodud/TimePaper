package com.timepaper.backend.global.exception.custom;

import com.timepaper.backend.global.exception.ErrorCode;

public class DuplicateEmailException extends GlobalException {

  public DuplicateEmailException() {
    super(ErrorCode.DUPLICATE_EMAIL);
  }
}
