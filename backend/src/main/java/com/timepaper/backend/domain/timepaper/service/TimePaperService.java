package com.timepaper.backend.domain.timepaper.service;

import com.timepaper.backend.domain.timepaper.dto.request.TimePaperCreateRequestDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperResponseDto;
import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.timepaper.repository.TimePaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TimePaperService {
  private final TimePaperRepository timePaperRepository;

  public TimePaperResponseDto createTimePaper(TimePaperCreateRequestDto timePaperCreateRequestDto) {
    TimePaper timePaper = timePaperRepository.save(timePaperCreateRequestDto.toEntity());
    return TimePaperResponseDto.from(timePaper);
  }

}
