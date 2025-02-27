package com.timepaper.backend.global.handler;

import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.exception.InvalidRefreshTokenException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(InvalidRefreshTokenException.class)
  public ResponseEntity<ApiResponse<Object>> handleInvalidRefreshToken(
      InvalidRefreshTokenException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ApiResponse
            //에러메시지는 논의 후 변경 예정
            .error("Refresh Token이 유효하지 않습니다", "3003"));
  }

}
