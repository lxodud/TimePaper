package com.timepaper.backend.global.auth.controller;

import com.timepaper.backend.global.auth.dto.CertificationNumberRequestDto;
import com.timepaper.backend.global.auth.dto.EmailCertificationRequestDto;
import com.timepaper.backend.global.auth.dto.SignupDto;
import com.timepaper.backend.global.auth.service.AuthService;
import com.timepaper.backend.global.dto.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/auth/reissue")
  public void reissueToken(HttpServletResponse response,
      @CookieValue(value = "refresh_token", required = true) String refreshToken) {

    log.info("refreshToken : {}", refreshToken);
    authService.reissueToken(response, refreshToken);
  }

  @PostMapping("/auth/logout")
  public void logout(HttpServletResponse response,
      @CookieValue(value = "refresh_token", required = false) String refreshToken,
      Authentication authentication) {
    log.info("refreshToken : {}", refreshToken);
    authService.logout(response, refreshToken, authentication);
  }

  public ResponseEntity<ApiResponse<Boolean>> emailverification(
      @RequestBody EmailCertificationRequestDto dto) {
    return ResponseEntity.ok(ApiResponse.ok(
        authService.emailverification(dto)
    ));
  }

  @PostMapping("/auth/email-verification-codes/validate")
  public ResponseEntity<ApiResponse<Boolean>> checkEmailVerificationCode(
      @RequestBody CertificationNumberRequestDto dto) {
    return ResponseEntity.ok(ApiResponse.ok(
        authService.checkEmailVerificationCode(dto)
    ));
  }

  @PostMapping("/auth/signup")
  public ResponseEntity<ApiResponse<Boolean>> signUp(@RequestBody SignupDto dto) {
    return ResponseEntity.ok(ApiResponse.ok(
        authService.signUp(dto)
    ));
  }
}
