package com.timepaper.backend.domain.timepaper.dto.response;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class TimePaperResponseDto {

  private final UUID timePaperId;
  private final String title;
  private final String recipientEmail;
  private final Long writerId;

  private final LocalDateTime createdAt;
  private final LocalDateTime releaseDate;

  private final boolean isLocked;

  public static TimePaperResponseDto from(TimePaper timePaper) {
    return TimePaperResponseDto.builder()
        .timePaperId(timePaper.getId())
        .title(timePaper.getTitle())
        .recipientEmail(timePaper.getRecipientEmail())
        .writerId(timePaper.getCreator().getId())
        .createdAt(timePaper.getCreatedAt())
        .releaseDate(timePaper.getReleaseDate())
        .isLocked(timePaper.isLocked())
        .build();
  }
}
