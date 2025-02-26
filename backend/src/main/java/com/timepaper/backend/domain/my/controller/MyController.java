package com.timepaper.backend.domain.my.controller;

import com.timepaper.backend.domain.my.dto.response.MyPostitListResponseDto;
import com.timepaper.backend.domain.my.dto.response.MyTimepaperListResponseDto;
import com.timepaper.backend.domain.my.service.MyService;
import com.timepaper.backend.global.dto.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my")
public class MyController {
  private final MyService myService;

  @GetMapping
  public List<MyTimepaperListResponseDto> readMyTimepapers() {
    List<MyTimepaperListResponseDto> response = myService.readMyTimepapers();
    return response;
  }

  @GetMapping("/{timePaperId}/postits")
  public List<MyPostitListResponseDto> readMyPostit(@PathVariable Long timePaperId) {
    List<MyPostitListResponseDto> response = myService.readMyPostits(timePaperId);
    return response;

  }
}
