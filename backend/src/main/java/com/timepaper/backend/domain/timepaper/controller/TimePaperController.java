package com.timepaper.backend.domain.timepaper.controller;

import com.timepaper.backend.domain.timepaper.dto.request.TimePaperCreateRequestDto;
import com.timepaper.backend.domain.timepaper.dto.request.TimePaperLockRequestDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperLockResponseDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperResponseDto;
import com.timepaper.backend.domain.timepaper.service.TimePaperService;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.global.dto.ApiResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
                             "CREATED",
                             responseDto));
  }

  @GetMapping("/{timepaperId}")
  public ResponseEntity<ApiResponse<TimePaperResponseDto>> readTimePaperById(
      @PathVariable UUID timepaperId) {

    TimePaperResponseDto responseDto = timePaperService.readTimePaperById(timepaperId);
    return ResponseEntity.status(HttpStatus.OK)
               .body(ApiResponse
                         .ok("타임페이퍼 조회 성공",
                             "OK",
                             responseDto));
  }

  @DeleteMapping("/{timepaperId}")
  public ResponseEntity<ApiResponse<Void>> deleteTimePaper(@PathVariable UUID timepaperId) {
    timePaperService.deleteTimePaper(timepaperId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT)
               .body(ApiResponse
                         .ok("타임페이퍼 삭제 성공",
                             "NO_CONTENT",
                             null));
  }

  @PatchMapping("/{timePaperId}/lock")
  public ResponseEntity<ApiResponse<TimePaperLockResponseDto>> lockTimePaper(
      @PathVariable UUID timePaperId,
      @RequestBody TimePaperLockRequestDto timePaperLockRequestDto,
      @AuthenticationPrincipal User requester
  ) {

    TimePaperLockResponseDto responseDto = timePaperService.lockTimePaper(timePaperId,
        timePaperLockRequestDto, requester.getId());
    return ResponseEntity.status(HttpStatus.OK)
               .body(ApiResponse.ok("타임페이퍼 잠금 처리 성공", "OK", responseDto));
  }

}
