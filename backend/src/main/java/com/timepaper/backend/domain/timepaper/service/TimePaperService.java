package com.timepaper.backend.domain.timepaper.service;

import com.timepaper.backend.domain.postit.repository.PostitRepository;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TimePaperService {

  private final TimePaperRepository timePaperRepository;
  private final UserRepository userRepository;
  private final PostitRepository postitRepository;

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

  public TimePaperResponseDto getTimePaperById(UUID timepaperId) {

    TimePaper timePaper = timePaperRepository.findById(timepaperId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"해당 타임페이퍼는 존재하지 않습니다."));
    return TimePaperResponseDto.from(timePaper);
  }

  @Transactional
  public void deleteTimePaper(UUID timepaperId) {
    // 삭제할 타임페이퍼 조회
    TimePaper timePaper = timePaperRepository.findById(timepaperId)
        .orElseThrow(() -> new IllegalArgumentException("해당 타임페이퍼를 찾을 수 없습니다."));

    // 1. 해당 타임페이퍼를 참조하는 모든 포스트잇 삭제
    postitRepository.deleteByTimePaperId(timepaperId);

    // 2. 타임페이퍼 삭제
    timePaperRepository.delete(timePaper);
  }

  @Transactional
  public TimePaperLockResponseDto lockTimePaper(UUID timepaperId, TimePaperLockRequestDto timePaperLockRequestDto) {

    TimePaper timePaper = timePaperRepository.findById(timepaperId)
        .orElseThrow(() -> new IllegalArgumentException("해당 타임페이퍼를 찾을 수 없습니다."));
    timePaper.setReleaseDate(timePaperLockRequestDto.getRecipientEmail(), timePaperLockRequestDto.getReleaseDate());
    return TimePaperLockResponseDto.from(timePaper);
  }

}

