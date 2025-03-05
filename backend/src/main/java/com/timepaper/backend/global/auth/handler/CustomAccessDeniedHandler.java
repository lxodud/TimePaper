package com.timepaper.backend.global.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

  private final ObjectMapper objectMapper;

  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
      AccessDeniedException accessDeniedException) throws IOException, ServletException {

    response.setContentType("application/json;charset=UTF-8");
    response.setStatus(HttpServletResponse.SC_FORBIDDEN);

    ApiResponse<Void> errorResponse = ApiResponse.error(ErrorCode.DEFAULT_FORBIDDEN.getMessage(),
        ErrorCode.DEFAULT_FORBIDDEN.getCode());
    response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
  }
}
