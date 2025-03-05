package com.timepaper.backend.global.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

  private final ObjectMapper objectMapper;

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException, ServletException {

    log.info("CustomAuthenticationFailureHandler");

    if (exception instanceof BadCredentialsException e) {
      response.setContentType("application/json;charset=UTF-8");
      response.setStatus(ErrorCode.INVALID_CREDENTIALS.getStatus().value());

      ApiResponse<Void> errorResponse = ApiResponse.error(
          ErrorCode.INVALID_CREDENTIALS.getMessage(),
          ErrorCode.INVALID_CREDENTIALS.getCode());
      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
  }
}
