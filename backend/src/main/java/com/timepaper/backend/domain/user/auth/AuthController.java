package com.timepaper.backend.domain.user.auth;

import com.timepaper.backend.domain.user.auth.dto.EmailverificationRequestDto;
import com.timepaper.backend.domain.user.auth.dto.SignupDto;
import lombok.RequiredArgsConstructor;
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
  public boolean emailverification(@RequestBody EmailverificationRequestDto dto) {
    return authService.emailverification(dto);
  }

  @PostMapping("/email-verification-codes/validate")
  public boolean checkEmailVerificationCode(@RequestBody EmailverificationRequestDto dto) {
    return authService.checkEmailVerificationCode(dto);
  }

  @PostMapping("/signup")
  public void signUp(@RequestBody SignupDto dto) {
    authService.signUp(dto);
  }
}
