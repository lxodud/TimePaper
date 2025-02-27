package com.timepaper.backend.domain.timepaper.controller;

import com.timepaper.backend.domain.timepaper.dto.request.TimePaperCreateRequestDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperResponseDto;
import com.timepaper.backend.domain.timepaper.service.TimePaperService;
import com.timepaper.backend.global.dto.ApiResponse;
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
@RequestMapping("/api/timepapers")
@RequiredArgsConstructor
public class TimePaperController {

  private final TimePaperService timePaperService;

  @PostMapping
  public ResponseEntity<ApiResponse<TimePaperResponseDto>> createTimePaper(
      @RequestBody TimePaperCreateRequestDto timePaperCreateRequestDto,
      Authentication authentication) {

    TimePaperResponseDto responseDto =
        timePaperService.createTimePaper(timePaperCreateRequestDto, authentication);

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse
            .ok("타임페이퍼 생성 성공",
                "SUCCESS",
                responseDto));
  }

}
