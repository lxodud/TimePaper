package com.timepaper.backend.global.auth.filter;

import static java.util.Arrays.stream;

import com.timepaper.backend.global.auth.token.util.JWTUtil;
import com.timepaper.backend.global.config.SecurityPathConfig;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JWTUtil jwtUtil;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    String accessToken = getAccessTokenRequest(request);
    log.info("Access token: {}", accessToken);

    if (StringUtils.hasText(accessToken) && jwtUtil.validateToken(accessToken)) {
      String email = jwtUtil.getEmail(accessToken);
      UserDetails userDetails = userDetailsService.loadUserByUsername(email);

      Authentication authentication = new UsernamePasswordAuthenticationToken(
          userDetails, null, userDetails.getAuthorities());

      SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    filterChain.doFilter(request, response);
  }

  private String getAccessTokenRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    String path = request.getServletPath();
    String method = request.getMethod();
    AntPathMatcher antPathMatcher = new AntPathMatcher();

    if ("GET".equalsIgnoreCase(method)) {
      return matchesPattern(path, SecurityPathConfig.PUBLIC_GET_URLS, antPathMatcher);
    }

    if ("POST".equalsIgnoreCase(method)) {
      return matchesPattern(path, SecurityPathConfig.PUBLIC_POST_URLS, antPathMatcher);
    }

    return false;
  }

  private boolean matchesPattern(String path, String[] patterns, AntPathMatcher matcher) {
    return stream(patterns).anyMatch(pattern -> matcher.match(pattern, path));
  }

}
