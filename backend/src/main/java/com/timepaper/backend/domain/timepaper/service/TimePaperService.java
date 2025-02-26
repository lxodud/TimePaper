package com.timepaper.backend.domain.timepaper.service;

import com.timepaper.backend.domain.timepaper.dto.request.TimePaperCreateRequestDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperResponseDto;
import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.timepaper.repository.TimePaperRepository;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TimePaperService {
  private final TimePaperRepository timePaperRepository;
  private final UserRepository userRepository;

  @Transactional
  public TimePaperResponseDto createTimePaper(TimePaperCreateRequestDto timePaperCreateRequestDto, String creatorEmail) {

    User creator = (User) userRepository.findByEmail(creatorEmail)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    TimePaper timePaper = TimePaper.builder().creator(creator).title(timePaperCreateRequestDto.getTitle()).build();
    timePaper = timePaperRepository.save(timePaper);
    return TimePaperResponseDto.from(timePaper);
  }

}
