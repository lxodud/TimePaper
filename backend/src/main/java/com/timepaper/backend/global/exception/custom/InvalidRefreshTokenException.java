package com.timepaper.backend.global.exception.custom;


public class InvalidRefreshTokenException extends RuntimeException {

  public InvalidRefreshTokenException(String message) {
    super(message);
  }

}
