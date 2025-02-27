package com.timepaper.backend.domain.my.controller;

import com.timepaper.backend.domain.my.dto.response.MyPostitListResponseDto;
import com.timepaper.backend.domain.my.dto.response.MyTimepaperListResponseDto;
import com.timepaper.backend.domain.my.service.MyService;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.global.dto.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my")
public class MyController {
  private final MyService myService;

  @GetMapping("/timepapers")
  public List<MyTimepaperListResponseDto> readMyTimepapers(@AuthenticationPrincipal User authenticatedUser) {
    List<MyTimepaperListResponseDto> response = myService.readMyTimepapers(authenticatedUser);
    return response;
  }

  @GetMapping("/postits")
  public List<MyPostitListResponseDto> readMyPostit(@AuthenticationPrincipal User authenticatedUser) {
    List<MyPostitListResponseDto> response = myService.readMyPostits(authenticatedUser);
    return response;   //@get userId by dint of RequestBody
  }
}
