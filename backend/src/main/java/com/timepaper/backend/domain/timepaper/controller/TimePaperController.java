package com.timepaper.backend.domain.timepaper.controller;

import com.timepaper.backend.domain.timepaper.dto.request.TimePaperCreateRequestDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperResponseDto;
import com.timepaper.backend.domain.timepaper.service.TimePaperService;
import com.timepaper.backend.global.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/timepaper")
@RequiredArgsConstructor
public class TimePaperController {
  private final TimePaperService timePaperService;

  @PostMapping
  public ResponseEntity<ApiResponse<TimePaperResponseDto>> createTimePaper(@Valid @RequestBody TimePaperCreateRequestDto timePaperCreateRequestDto, Authentication authentication) {

    String creatorEmail = authentication.getName();

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(
            ApiResponse.ok("타임페이퍼 생성 성공", "SUCCESS",
                timePaperService.createTimePaper(timePaperCreateRequestDto,creatorEmail))

    );
  }
}
