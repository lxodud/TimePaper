package com.timepaper.backend.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.timepaper.backend.domain.user.dto.request.LoginRequestDto;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

//TODO: 이메일 형식 유효성 검증 로직
@RequiredArgsConstructor
@Component
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final ObjectMapper objectMapper;

  @PostConstruct
  public void init() {
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

    return authenticationManager.authenticate(authToken);
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain, Authentication authResult) throws IOException, ServletException {
    log.info("로그인 검증 성공");
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException failed)
      throws IOException, ServletException {
    log.info("로그인 검증 실패");
  }

  private void validateLoginRequest(LoginRequestDto requestDto) {
    Optional<String> emailOpt = Optional.ofNullable(requestDto.getEmail());
    Optional<String> passwordOpt = Optional.ofNullable(requestDto.getPassword());

    if (emailOpt.isEmpty() || passwordOpt.isEmpty()) {
      throw new IllegalArgumentException("Email 또는 Password empty");
    }

  }
}
