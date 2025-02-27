package com.timepaper.backend.global.auth.controller;

import com.timepaper.backend.global.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/auth/reissue")
  public void reissueToken(HttpServletRequest request,
      HttpServletResponse response,
      @CookieValue(value = "refresh_token", required = true) String refreshToken) {
    request.getHeader("Cookie");

    authService.reissueToken(response, refreshToken);
  }

}
