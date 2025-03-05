package com.timepaper.backend.global.config;

import com.timepaper.backend.global.auth.filter.JwtAuthenticationFilter;
import com.timepaper.backend.global.auth.filter.LoginFilter;
import com.timepaper.backend.global.auth.handler.CustomAccessDeniedHandler;
import com.timepaper.backend.global.auth.handler.CustomAuthenticationFailureHandler;
import com.timepaper.backend.global.auth.handler.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final LoginFilter loginFilter;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final CustomAccessDeniedHandler accessDeniedHandler;
  private final CustomAuthenticationFailureHandler authenticationFailureHandler;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
        .formLogin(auth -> auth.disable())
        .httpBasic(auth -> auth.disable())
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers(HttpMethod.GET, SecurityPathConfig.PUBLIC_GET_URLS).permitAll()
            .requestMatchers(HttpMethod.POST, SecurityPathConfig.PUBLIC_POST_URLS).permitAll()
            .anyRequest().authenticated()
        )
        .addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class)
        .formLogin(form -> form
            .failureHandler(authenticationFailureHandler))
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling(exception -> exception
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(accessDeniedHandler)
        );

    return http.build();
  }


}