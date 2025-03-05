package com.timepaper.backend.global.auth.service;

import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.domain.user.repository.UserRepository;
import com.timepaper.backend.global.auth.dto.CertificationNumberRequestDto;
import com.timepaper.backend.global.auth.dto.EmailCertificationRequestDto;
import com.timepaper.backend.global.auth.dto.SignupDto;
import com.timepaper.backend.global.auth.token.service.RefreshTokenService;
import com.timepaper.backend.global.auth.token.util.JWTUtil;
import com.timepaper.backend.global.auth.token.util.RefreshTokenUtil;
import com.timepaper.backend.global.emailsender.EmailSendManager;
import com.timepaper.backend.global.exception.custom.signup.DuplicateEmailException;
import com.timepaper.backend.global.exception.custom.signup.ExpiredAuthCodeException;
import com.timepaper.backend.global.exception.custom.signup.ExpiredEmailVerificationException;
import com.timepaper.backend.global.exception.custom.signup.InvalidAuthCodeException;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

  private final RefreshTokenService refreshTokenService;
  private final JWTUtil jwtUtil;
  private final RefreshTokenUtil refreshTokenUtil;
  private final UserRepository userRepository;
  private final RedisTemplate<String, String> redisTemplate;
  private final EmailSendManager emailSendManager;
  private final PasswordEncoder passwordEncoder;

  public void setTokensResponse(HttpServletResponse response, Authentication authentication,
      Long userId) {
    String accessToken = jwtUtil.createToken(authentication, userId);
    String refreshToken = refreshTokenUtil.createRefreshToken(authentication.getName());
    refreshTokenService.save(refreshToken, authentication);

    ResponseCookie refreshTokenCookie = createCookie(refreshToken, false);
    response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
    response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
    response.setStatus(HttpServletResponse.SC_OK);
  }

  public void reissueToken(HttpServletResponse response, String refreshToken) {

    Authentication authentication = refreshTokenService.validate(refreshToken);

    //refreshToken에서 email을 가져오고, 이걸 기반으로 user_id 가져오기
    Long userId = refreshTokenService.getUserId(refreshToken);
    log.info("userId: {}", userId);

    setTokensResponse(response, authentication, userId);
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

  public void requestEmailVerificationCode(EmailCertificationRequestDto dto) {
    boolean isEmailExistence = userRepository.isExistEmail(dto.getEmail());

    if (isEmailExistence) {
      throw new DuplicateEmailException();
    }

    String authenticationCode = UUID.randomUUID().toString()
        .replace("-", "")
        .substring(0, 6)
        .toUpperCase();
    redisTemplate.opsForValue().set(dto.getEmail(), authenticationCode, Duration.ofMinutes(5));

    emailSendManager.sendEmail(dto.getEmail(), "타임페이퍼 인증코드", authenticationCode);
  }

  @Transactional
  public void checkEmailVerificationCode(CertificationNumberRequestDto dto) {
    String authenticationCode = redisTemplate.opsForValue().get(dto.getEmail());

    if (authenticationCode == null) {
      throw new ExpiredAuthCodeException();
    }

    boolean isVerificationCodeEqual = authenticationCode.equals(dto.getAuthenticationCode());

    if (!isVerificationCodeEqual) {
      throw new InvalidAuthCodeException();
    }

    redisTemplate.opsForValue()
        .set(dto.getEmail(), "true", Duration.ofMinutes(5));
  }


  @Transactional
  public void signUp(SignupDto dto) {
    boolean isAuthenticatedEmail = Boolean.parseBoolean(
        redisTemplate.opsForValue().get(dto.getEmail())
    );

    if (!isAuthenticatedEmail) {
      throw new ExpiredEmailVerificationException();
    }

    String encodedPassword = passwordEncoder.encode(dto.getPassword());

    User user = dto.toEntity(encodedPassword);
    userRepository.save(user);
  }

}
