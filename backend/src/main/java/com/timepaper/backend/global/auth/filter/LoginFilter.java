package com.timepaper.backend.global.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.timepaper.backend.domain.user.dto.request.LoginRequestDto;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.global.auth.service.AuthService;
import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.auth.LoginValidationException;
import com.timepaper.backend.global.exception.custom.common.GlobalException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
@Component
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

  private final ObjectMapper objectMapper;
  private final AuthService authService;
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
      //여기 예외처리 어떻게 하징
      throw new GlobalException(ErrorCode.SERVER_ERROR);
    }

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

    User user = (User) authentication.getPrincipal();
    log.info("User : {}", user.getId());
    authService.setTokensResponse(response, authentication, user.getId());

  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException failed)
      throws IOException, ServletException {

    log.info("로그인 검증 실패");
    log.info("failed: {}", failed);
    log.info(failed.getMessage());

    ApiResponse<Object> apiResponse = null;
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (failed instanceof LoginValidationException) {
      LoginValidationException exception = (LoginValidationException) failed;
      apiResponse = ApiResponse.error(exception.getErrorCode().getMessage(),
          exception.getErrorCode().getCode());
      status = exception.getErrorCode().getStatus();

    } else if (failed instanceof BadCredentialsException) {
      log.info("BadCredentialsException");
      apiResponse = ApiResponse.error(ErrorCode.INVALID_CREDENTIALS.getMessage(),
          ErrorCode.INVALID_CREDENTIALS.getCode());
      status = ErrorCode.INVALID_CREDENTIALS.getStatus();
    }

    response.setContentType("application/json");
    response.setStatus(status.value());
    objectMapper.writeValue(response.getOutputStream(), apiResponse);
  }

  private void validateLoginRequest(LoginRequestDto requestDto) {

    if (!StringUtils.hasText(requestDto.getEmail()) || !StringUtils.hasText(
        requestDto.getPassword())) {
      throw new LoginValidationException();
    }
  }

}
