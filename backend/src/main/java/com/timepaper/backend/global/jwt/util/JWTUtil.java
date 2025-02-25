package com.timepaper.backend.global.jwt.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class JWTUtil {

  private final long tokenValidityInMilliseconds = 1000L * 60 * 60; // 1시간

  @Value("${jwt.secret}")
  private String secretKey;

  @PostConstruct
  protected void init() {
    secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
  }

  public String createToken(Authentication authentication) {
    String email = authentication.getName();
    Claims claims = Jwts.claims().setSubject(email);

    Date now = new Date();
    Date validity = new Date(now.getTime() + tokenValidityInMilliseconds);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(validity)
        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
        .compact();
  }

  public String getEmail(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  public boolean isExpired(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getExpiration()
        .before(new Date());
  }

}
