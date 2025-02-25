package com.timepaper.backend.global.jwt.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.timepaper.backend.domain.user.dto.request.LoginRequestDto;
import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.jwt.util.JWTUtil;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

//TODO: 이메일 형식 유효성 검증 로직
@RequiredArgsConstructor
@Component
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

  private final ObjectMapper objectMapper;
  private final JWTUtil jwtUtil;
  private final AuthenticationManager authenticationManager;

  @PostConstruct
  public void initializeLoginFilter() {
    setAuthenticationManager(authenticationManager);
    setFilterProcessesUrl("/api/auth/login");
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
      HttpServletResponse response) throws AuthenticationException {

    LoginRequestDto requestDto;

    try {
      requestDto = objectMapper.readValue(request.getInputStream(),
          LoginRequestDto.class);

    } catch (IOException e) {
      throw new RuntimeException("LoginRequestDto 파싱 중 에러 발생 ", e);
    }
    // 이메일 형식 유효성 검증
    validateLoginRequest(requestDto);

    String email = requestDto.getEmail();
    String password = requestDto.getPassword();
    log.info("email : {}, password : {}", email, password);

    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
        email, password, null);

    return getAuthenticationManager().authenticate(authToken);
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain, Authentication authentication) throws IOException, ServletException {

    String accessToken = jwtUtil.createToken(authentication);
    log.info("로그인 검증 성공, accessToken : {}", accessToken);

    response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
    response.setStatus(HttpServletResponse.SC_OK);
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException failed)
      throws IOException, ServletException {
    log.info("로그인 검증 실패");
    ApiResponse<Object> apiResponse = ApiResponse.error("Invalid credentials", "ERROR");

    response.setContentType("application/json");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

    objectMapper.writeValue(response.getOutputStream(), apiResponse);
  }

  private void validateLoginRequest(LoginRequestDto requestDto) {
    if (!StringUtils.hasText(requestDto.getEmail())) {
      throw new IllegalArgumentException("Email은 필수 입력 값입니다.");
    }

    if (!StringUtils.hasText(requestDto.getPassword())) {
      throw new IllegalArgumentException("Password는 필수 입력 값입니다.");
    }
  }
}
