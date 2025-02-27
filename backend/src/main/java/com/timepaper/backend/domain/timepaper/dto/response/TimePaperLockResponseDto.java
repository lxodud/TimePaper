package com.timepaper.backend.domain.timepaper.dto.response;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class TimePaperLockResponseDto {

  private final UUID timePaperId;
  private final String recipientEmail;
  private final LocalDateTime releaseDate;

  public static TimePaperLockResponseDto from(TimePaper timePaper) {
    return TimePaperLockResponseDto.builder()
        .timePaperId(timePaper.getId())
        .recipientEmail(timePaper.getRecipientEmail())
        .releaseDate(timePaper.getReleaseDate())
        .build();
  }
}
