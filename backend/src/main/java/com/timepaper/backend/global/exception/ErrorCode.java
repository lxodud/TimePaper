package com.timepaper.backend.global.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

  //공통 오류
  BAD_REQUEST(HttpStatus.BAD_REQUEST, "4000", "잘못된 요청입니다"),
  UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "4001", "인증이 필요합니다"),
  FORBIDDEN(HttpStatus.FORBIDDEN, "4003", "접근 권한이 없습니다"),
  NOT_FOUND(HttpStatus.NOT_FOUND, "4004", "리소스를 찾을 수 없습니다"),
  INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "5000", "서버 오류가 발생했습니다"),

  //인증 관련
  INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "3000", "아이디 또는 비밀번호가 일치하지 않습니다"),
  INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "3001", "유효하지 않은 JWT TOKEN 입니다."),
  FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "3002", "접근 권한이 없습니다"),
  INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "3003", "유효하지 않은 REFRESH TOKEN 입니다."),

  DUPLICATE_EMAIL(HttpStatus.BAD_REQUEST, "1000", "이미 사용 중인 이메일입니다."),


  //타 도메인 예시(선택사항)
  TIMEPAPER_NOT_FOUND(HttpStatus.NOT_FOUND, "2000", "타임페이퍼를 찾을 수 없습니다");

  private final HttpStatus status;
  private final String code;
  private final String message;
}
