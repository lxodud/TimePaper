package com.timepaper.backend.global.exception.custom.common;

import com.timepaper.backend.global.exception.ErrorCode;

public class ForBiddenException extends GlobalException {

  public ForBiddenException(ErrorCode errorCode) {
    super(errorCode);
  }

  public ForBiddenException() {
    super(ErrorCode.DEFAULT_FORBIDDEN);
  }
}
