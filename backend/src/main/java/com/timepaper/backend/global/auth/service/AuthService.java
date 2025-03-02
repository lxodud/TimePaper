package com.timepaper.backend.global.auth.service;

import com.timepaper.backend.global.auth.token.service.RefreshTokenService;
import com.timepaper.backend.global.auth.token.util.JWTUtil;
import com.timepaper.backend.global.auth.token.util.RefreshTokenUtil;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

  private final RefreshTokenService refreshTokenService;
  private final JWTUtil jwtUtil;
  private final RefreshTokenUtil refreshTokenUtil;

  public void setTokensResponse(HttpServletResponse response, Authentication authentication) {
    String accessToken = jwtUtil.createToken(authentication);
    String refreshToken = refreshTokenUtil.createRefreshToken(authentication.getName());
    refreshTokenService.save(refreshToken, authentication);

    ResponseCookie refreshTokenCookie = createCookie(refreshToken, false);
    response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
    response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
    response.setStatus(HttpServletResponse.SC_OK);
  }


  public void reissueToken(HttpServletResponse response, String refreshToken) {

    Authentication authentication = refreshTokenService.validate(refreshToken);
    setTokensResponse(response, authentication);
  }


  public void logout(HttpServletResponse response, String refreshToken,
      Authentication authentication) {

    refreshTokenService.delete(authentication.getName());

    ResponseCookie expiredRefreshTokenCookie = createCookie(refreshToken, true);
    response.setHeader(HttpHeaders.SET_COOKIE, expiredRefreshTokenCookie.toString());
    response.setStatus(HttpServletResponse.SC_NO_CONTENT);
  }

  private ResponseCookie createCookie(String refreshToken, boolean isExpired) {

    Duration maxAge = isExpired ? Duration.ZERO : Duration.ofDays(7);
    String path = "/api/auth";

    return ResponseCookie.from("refresh_token", refreshToken)
        .httpOnly(true)
        .secure(true) //개발환경 false, 배포시 true
        .sameSite("None")
        .path(path)
        .maxAge(maxAge)
        .build();
  }


}
