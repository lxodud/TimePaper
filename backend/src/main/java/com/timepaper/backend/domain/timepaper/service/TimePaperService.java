package com.timepaper.backend.domain.timepaper.service;

import com.timepaper.backend.domain.timepaper.dto.request.TimePaperCreateRequestDto;
import com.timepaper.backend.domain.timepaper.dto.request.TimePaperLockRequestDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperLockResponseDto;
import com.timepaper.backend.domain.timepaper.dto.response.TimePaperResponseDto;
import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.timepaper.repository.TimePaperRepository;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.domain.user.repository.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TimePaperService {

  private final TimePaperRepository timePaperRepository;
  private final UserRepository userRepository;

  @Transactional
  public TimePaperResponseDto createTimePaper(TimePaperCreateRequestDto timePaperCreateRequestDto,
      Authentication authentication) {

    String creatorEmail = authentication.getName();

    User creator = (User) userRepository.findByEmail(creatorEmail)
                              .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

    TimePaper timePaper = timePaperRepository.save(
        TimePaper.builder()
            .creator(creator)
            .title(timePaperCreateRequestDto.getTitle())
            .build()
    );
    return TimePaperResponseDto.from(timePaper);
  }

  public TimePaperResponseDto readTimePaperById(UUID timepaperId) {

    TimePaper timePaper = timePaperRepository.findById(timepaperId)
                              .orElseThrow(
                                  () -> new IllegalArgumentException("해당 타임페이퍼를 찾을 수 없습니다."));
    return TimePaperResponseDto.from(timePaper);
  }

  @Transactional
  public void deleteTimePaper(UUID timepaperId) {
    TimePaper timePaper = timePaperRepository.findById(timepaperId)
                              .orElseThrow(
                                  () -> new IllegalArgumentException("해당 타임페이퍼를 찾을 수 없습니다."));
    timePaperRepository.delete(timePaper);
  }

  @Transactional
  public TimePaperLockResponseDto lockTimePaper(
      UUID timePaperId,
      TimePaperLockRequestDto timePaperLockRequestDto,
      Long requesterId
  ) {

    TimePaper timePaper = timePaperRepository.findById(timePaperId)
                              .orElseThrow(
                                  () -> new IllegalArgumentException("해당 타임페이퍼를 찾을 수 없습니다."));

    if (!timePaper.getCreator().getId().equals(requesterId)) {
      throw new IllegalArgumentException("잠금 권한이 없습니다.");
    }

    timePaper.setReleaseDate(timePaperLockRequestDto.getRecipientEmail(),
        timePaperLockRequestDto.getReleaseDate());
    return TimePaperLockResponseDto.from(timePaper);
  }

}

