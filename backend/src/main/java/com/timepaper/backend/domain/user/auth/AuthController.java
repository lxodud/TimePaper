package com.timepaper.backend.domain.user.auth;

import com.timepaper.backend.domain.user.auth.dto.CertificationNumberRequestDto;
import com.timepaper.backend.domain.user.auth.dto.EmailCertificationRequestDto;
import com.timepaper.backend.domain.user.auth.dto.SignupDto;
import com.timepaper.backend.global.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/auth/email-verification-codes")
  public ResponseEntity<ApiResponse<Boolean>> emailverification(
      @RequestBody EmailCertificationRequestDto dto) {
    return ResponseEntity.ok(ApiResponse.ok(
        authService.emailverification(dto)
    ));
  }

  @PostMapping("/email-verification-codes/validate")
  public ResponseEntity<ApiResponse<Boolean>> checkEmailVerificationCode(
      @RequestBody CertificationNumberRequestDto dto) {
    return ResponseEntity.ok(ApiResponse.ok(
        authService.checkEmailVerificationCode(dto)
    ));
  }

  @PostMapping("/signup")
  public ResponseEntity<ApiResponse<Boolean>> signUp(@RequestBody SignupDto dto) {
    return ResponseEntity.ok(ApiResponse.ok(
        authService.signUp(dto)
    ));
  }
}
