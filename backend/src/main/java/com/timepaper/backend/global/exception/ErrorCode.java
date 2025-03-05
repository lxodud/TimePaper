package com.timepaper.backend.global.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 1000번 공통 2000번 회원가입 3000번 인증 인가 5000번 서버
 */
@Getter
@AllArgsConstructor
public enum ErrorCode {

  //1000번 공통

  //회원 관련 오류 (2000)
  DUPLICATE_EMAIL(HttpStatus.BAD_REQUEST, "2000", "이미 사용 중인 이메일입니다."),
  EXPIRED_AUTH_CODE(HttpStatus.BAD_REQUEST, "2001", "인증 코드 유효 시간이 만료되었습니다."),
  INVALID_AUTH_CODE(HttpStatus.BAD_REQUEST, "2002", "인증 코드가 일치하지 않습니다."),
  EXPIRED_EMAIL_VERIFICATION(HttpStatus.BAD_REQUEST, "2003", "이메일 인증 유효 시간이 만료되었습니다."),

  INVALID_EMAIL_FORMAT(HttpStatus.BAD_REQUEST, "1001", "이메일 형식이 올바르지 않습니다."),
  PASSWORD_TOO_SHORT(HttpStatus.BAD_REQUEST, "1002", "비밀번호는 최소 8자 이상이어야 합니다."),
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, "1003", "사용자를 찾을 수 없습니다."),

  //인증 관련 (3000번)
  INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "3000", "아이디 또는 비밀번호가 일치하지 않습니다"),
  INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "3001", "유효하지 않은 JWT TOKEN 입니다."),
  //필요한가?
  INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "3003", "유효하지 않은 REFRESH TOKEN 입니다."),
  EMAIL_PASSWORD_REQUIRED(HttpStatus.BAD_REQUEST, "3004", "이메일 비밀번호는 필수입니다."),


  //클라이언트 (4000번)
  INVALID_INPUT(HttpStatus.BAD_REQUEST, "4000", "입력값이 올바르지 않습니다."),
  PAYLOAD_TOO_LARGE(HttpStatus.BAD_REQUEST, "4001", "파일 크키가 너무 큽니다. 3MB 이하로 업로드해주세요."),
  DEFAULT_NOT_FOUND(HttpStatus.BAD_REQUEST, "4002", "해당 리소스가 존재하지 않습니다."),
  DEFAULT_FORBIDDEN(HttpStatus.FORBIDDEN, "4003", "권한이 없습니다."),

  //타임페이퍼(4100)
  TIMEPAPER_NOT_FOUND(HttpStatus.BAD_REQUEST, "4104", "해당 타임페이퍼가 존재하지 않습니다."),

  //포스트잇 (4200)
  POSTIT_DELETE_FORBIDDEN(HttpStatus.BAD_REQUEST, "4203", "해당 포스트잇을 삭제할 권한이 없습니다."),
  POSTIT_NOT_FOUND(HttpStatus.BAD_REQUEST, "4204", "해당 포스트잇이 존재하지 않습니다."),


  //네트워크, 데이터베이스 등
  SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "5000", "서버 내부 오류가 발생했습니다.");


  private final HttpStatus status;
  private final String code;
  private final String message;
}
