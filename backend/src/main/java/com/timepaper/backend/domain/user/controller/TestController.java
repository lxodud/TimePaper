package com.timepaper.backend.domain.user.controller;

import com.timepaper.backend.domain.user.dto.request.SignUpRequestDto;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 로그인 테스트 하기 위한 임시 회원가입 컨트롤러
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/signup")
public class TestController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @PostMapping
  public ResponseEntity<String> signUp(@RequestBody SignUpRequestDto requestDto) {
    String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
    User user = requestDto.toUser(encodedPassword);
    userRepository.save(user);
    return ResponseEntity.ok("회원가입 성공");
  }

}
