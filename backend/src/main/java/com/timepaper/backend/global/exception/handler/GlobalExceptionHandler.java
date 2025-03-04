package com.timepaper.backend.global.exception.handler;

import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.exception.custom.GlobalException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(GlobalException.class)
  public ResponseEntity<ApiResponse<Object>> exceptionHandler(GlobalException exception) {
    return ResponseEntity.status(exception.getErrorCode().getStatus())
        .body(ApiResponse
            .error(exception.getErrorCode().getMessage(), exception.getErrorCode().getCode()));
  }
}
