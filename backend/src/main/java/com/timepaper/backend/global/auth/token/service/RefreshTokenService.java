package com.timepaper.backend.global.auth.token.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.timepaper.backend.global.auth.token.entity.RefreshTokenInfo;
import com.timepaper.backend.global.auth.token.util.RefreshTokenUtil;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private static final long PERSISTENT_VALIDITY_DAYS = 7;
  private final StringRedisTemplate redisTemplate;
  private final RefreshTokenUtil refreshTokenUtil;
  private final ObjectMapper objectMapper;

  public void save(String refreshToken, Authentication authentication) {
    String hashedToken = refreshTokenUtil.hashToken(refreshToken);

    String email = authentication.getName();

    RefreshTokenInfo tokenInfo = RefreshTokenInfo.from(authentication, hashedToken);

    String tokenInfoJson;
    try {
      tokenInfoJson = objectMapper.writeValueAsString(tokenInfo);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("Failed to serialize RefreshTokenInfo", e);
    }

    try {
      redisTemplate.opsForValue().set(
          email,
          tokenInfoJson,
          Duration.ofDays(PERSISTENT_VALIDITY_DAYS)
      );
    } catch (DataAccessException e) {
      throw new RuntimeException("Failed to save RefreshTokenInfo to Redis", e);
    }

  }
}
