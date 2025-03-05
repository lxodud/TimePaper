package com.timepaper.backend.global.exception.custom.timepaper;

import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.common.GlobalException;

public class ResourceNotFoundException extends GlobalException {

  public ResourceNotFoundException(ErrorCode errorCode) {
    super(errorCode);
  }

  public ResourceNotFoundException() {
    super(ErrorCode.DEFAULT_NOT_FOUD);
  }
}
