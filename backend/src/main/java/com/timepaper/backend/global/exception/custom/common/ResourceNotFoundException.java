package com.timepaper.backend.global.exception.custom.common;

import com.timepaper.backend.global.exception.ErrorCode;

public class ResourceNotFoundException extends GlobalException {

  public ResourceNotFoundException(ErrorCode errorCode) {
    super(errorCode);
  }

  public ResourceNotFoundException() {
    super(ErrorCode.DEFAULT_NOT_FOUND);
  }
}
