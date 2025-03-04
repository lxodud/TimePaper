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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private final ObjectMapper objectMapper;

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException, ServletException {

    response.setContentType("application/json;charset=UTF-8");
    response.setStatus(ErrorCode.INVALID_ACCESS_TOKEN.getStatus().value());

    ApiResponse<Void> errorResponse = ApiResponse.error(ErrorCode.INVALID_ACCESS_TOKEN.getMessage(),
        ErrorCode.INVALID_ACCESS_TOKEN.getCode());
    response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
  }
}
