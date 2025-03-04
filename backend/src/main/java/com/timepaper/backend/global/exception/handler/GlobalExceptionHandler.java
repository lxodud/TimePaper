package com.timepaper.backend.global.exception.handler;

import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.common.GlobalException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(GlobalException.class)
  public ResponseEntity<ApiResponse<Object>> exceptionHandler(GlobalException ex) {
    return ResponseEntity.status(ex.getErrorCode().getStatus())
        .body(ApiResponse
            .error(ex.getErrorCode().getMessage(), ex.getErrorCode().getCode()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Object>> methodArgumentNotValidHandler(
      MethodArgumentNotValidException ex) {
    return ResponseEntity.status(ErrorCode.INVALID_INPUT.getStatus())
        .body(ApiResponse
            .error(ErrorCode.INVALID_INPUT.getMessage(), ErrorCode.INVALID_INPUT.getCode()));
  }
}
