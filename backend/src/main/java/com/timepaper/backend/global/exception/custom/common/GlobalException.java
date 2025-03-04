package com.timepaper.backend.global.exception.custom.common;

import com.timepaper.backend.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class GlobalException extends RuntimeException {

  private ErrorCode errorCode;

  public GlobalException(ErrorCode errorCode) {
    super(errorCode.getMessage());
    this.errorCode = errorCode;
  }

  public GlobalException(ErrorCode errorCode, String message) {
    super(message);
    this.errorCode = errorCode;
  }

}
