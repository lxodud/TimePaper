package com.timepaper.backend.global.exception.custom.common;

import com.timepaper.backend.global.exception.ErrorCode;

public class ServerErrorException extends GlobalException {
  
  public ServerErrorException() {
    super(ErrorCode.SERVER_ERROR);
  }
}
