package com.timepaper.backend.global.auth.controller;

import com.timepaper.backend.global.auth.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
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
    authService.logout(response, refreshToken, authentication);
  }

}
