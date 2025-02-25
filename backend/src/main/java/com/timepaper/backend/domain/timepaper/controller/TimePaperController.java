package com.timepaper.backend.domain.timepaper.controller;

import com.timepaper.backend.domain.timepaper.dto.request.TimePaperCreateRequestDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperResponseDto;
import com.timepaper.backend.domain.timepaper.service.TimePaperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
  public TimePaperResponseDto createTimePaper(@RequestBody TimePaperCreateRequestDto timePaperCreateRequestDto) {
    return timePaperService.createTimePaper(timePaperCreateRequestDto);
  }
}
