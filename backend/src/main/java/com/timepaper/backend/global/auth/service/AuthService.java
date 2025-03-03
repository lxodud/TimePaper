package com.timepaper.backend.global.auth.service;

import com.timepaper.backend.domain.javaemail.JavaEmailSender;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.global.auth.dto.CertificationNumberRequestDto;
import com.timepaper.backend.global.auth.dto.EmailCertificationRequestDto;
import com.timepaper.backend.global.auth.dto.SignupDto;
import com.timepaper.backend.global.auth.repository.AuthRepository;
import com.timepaper.backend.global.auth.token.service.RefreshTokenService;
import com.timepaper.backend.global.auth.token.util.JWTUtil;
import com.timepaper.backend.global.auth.token.util.RefreshTokenUtil;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

  private final RefreshTokenService refreshTokenService;
  private final JWTUtil jwtUtil;
  private final RefreshTokenUtil refreshTokenUtil;
  private final AuthRepository authRepository;
  private final RedisTemplate<String, String> redisTemplate;
  private final JavaEmailSender javaEmailSender;

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


  public boolean emailverification(EmailCertificationRequestDto dto) {
    boolean emailExistence = authRepository.findByEmail(dto.getEmail());

    if (emailExistence) {
      return true;
    } else {
      String randomCode = UUID.randomUUID().toString().replace("-", "").substring(0, 6)
          .toUpperCase();
      redisTemplate.opsForValue().set(dto.getEmail(), randomCode, Duration.ofMinutes(5));

      System.out.println(randomCode); // 인증번호

//      JavaEmailDto javaEmailDto = new JavaEmailDto(dto.getEmail(), "TimePaper", randomCode);
//
//      javaEmailSender.sendJavaEmail(javaEmailDto);
      return false;
    }
  }

  @Transactional
  public boolean checkEmailVerificationCode(CertificationNumberRequestDto dto) {
    String randomCode = redisTemplate.opsForValue().get(dto.getEmail());
    String approvalStatus;
    System.out.println(randomCode);
    boolean verification = randomCode != null && randomCode.equals(dto.getCheckNum());

    if (verification) {
      approvalStatus = "approval";
      redisTemplate.opsForValue().set(dto.getEmail(), approvalStatus, Duration.ofMinutes(5));
      return true;
    } else {
      approvalStatus = "rejection";
      redisTemplate.opsForValue().set(dto.getEmail(), approvalStatus, Duration.ofMinutes(5));
      return false;
    }
  }

  @Transactional
  public boolean signUp(SignupDto dto) {

    String approvalStatus = redisTemplate.opsForValue().get(dto.getEmail());
    if (approvalStatus.equals("approval")) {
      try {
        User auth = dto.toEntity(dto);
        authRepository.save(auth);
        return true;
      } catch (Exception e) {
        return false;
      }
    } else {
      return false;
    }
  }

}
