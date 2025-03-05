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
import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.common.ForBiddenException;
import com.timepaper.backend.global.exception.custom.common.ResourceNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
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
        .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND));

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
        .orElseThrow(
            () -> new ResourceNotFoundException(ErrorCode.TIMEPAPER_NOT_FOUND));
    return TimePaperResponseDto.from(timePaper);
  }

  @Transactional
  public void deleteTimePaper(UUID timepaperId, Long userId) {

    TimePaper timePaper = timePaperRepository.findById(timepaperId)
        .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.TIMEPAPER_NOT_FOUND));

    if (timePaper.getCreator().getId() != userId) {
      throw new ForBiddenException(ErrorCode.AUTHOR_ONLY);
    }

    postitRepository.unLinkPostits(timepaperId);
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
            () -> new ResourceNotFoundException(ErrorCode.TIMEPAPER_NOT_FOUND));

    if (!timePaper.getCreator().getId().equals(requesterId)) {
      throw new ForBiddenException(ErrorCode.DEFAULT_FORBIDDEN);
    }

    timePaper.setReleaseDate(timePaperLockRequestDto.getRecipientEmail(),
        timePaperLockRequestDto.getReleaseDate());
    return TimePaperLockResponseDto.from(timePaper);
  }

}

