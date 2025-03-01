package com.timepaper.backend.global.auth.token.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.timepaper.backend.global.auth.token.entity.RefreshTokenInfo;
import com.timepaper.backend.global.auth.token.util.RefreshTokenUtil;
import com.timepaper.backend.global.exception.InvalidRefreshTokenException;
import java.time.Duration;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private static final long PERSISTENT_VALIDITY_DAYS = 7; //개발용 7일, 배포시 30분
  private final StringRedisTemplate redisTemplate;
  private final RefreshTokenUtil refreshTokenUtil;
  private final ObjectMapper objectMapper;

  public void save(String refreshToken, Authentication authentication) {

    String hashedToken = refreshTokenUtil.hashToken(refreshToken);
    String emailKey = refreshTokenUtil.createEmailKey(authentication.getName());

    RefreshTokenInfo tokenInfo = RefreshTokenInfo.from(authentication, hashedToken);

    String tokenInfoJson;
    try {
      tokenInfoJson = objectMapper.writeValueAsString(tokenInfo);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("Failed to serialize RefreshTokenInfo", e);
    }

    try {
      redisTemplate.opsForValue().set(
          emailKey,
          tokenInfoJson,
          Duration.ofDays(PERSISTENT_VALIDITY_DAYS)
      );
    } catch (DataAccessException e) {
      throw new RuntimeException("Failed to save RefreshTokenInfo to Redis", e);
    }

  }

  public Authentication validate(String refreshToken) {
    String emailKey = getEmailKey(refreshToken);
    log.info("emailKey: {}", emailKey);
    String tokenInfoJson = redisTemplate.opsForValue().get(emailKey);

    if (tokenInfoJson == null) {
      throw new InvalidRefreshTokenException("refresh token 유효하지 않음");
    }

    try {
      RefreshTokenInfo refreshTokenInfo = objectMapper.readValue(tokenInfoJson,
          RefreshTokenInfo.class);
      String hashedRefreshToken = refreshTokenInfo.getHashedRefreshToken();
      refreshTokenUtil.validateRefreshToken(refreshToken, hashedRefreshToken);

      return new UsernamePasswordAuthenticationToken(refreshTokenInfo.getEmail(), null,
          refreshTokenInfo.getRoles().stream().map(
              SimpleGrantedAuthority::new).collect(Collectors.toList()));

    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }

  }

  public void delete(String refreshToken) {
    try {
      String emailKey = getEmailKey(refreshToken);
      log.info("emailKey: {}", emailKey);
      Boolean delete = redisTemplate.delete(emailKey);
      log.info(delete.toString());
    } catch (InvalidRefreshTokenException e) {
      //예외 처리 고민
    }

  }

  private String getEmailKey(String refreshToken) {
    try {
      if (refreshToken == null || !refreshToken.contains("-")) {
        throw new InvalidRefreshTokenException("refreshToken이 없거나 유효하지 않음");
      }
      return refreshToken.split("-")[0];
    } catch (IllegalArgumentException e) {
      log.error("refreshToken이 만료되거나 없는 유효하지 않은 경우");
      throw e;
    }
  }
}
