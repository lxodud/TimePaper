package com.timepaper.backend.domain.timepaper.dto.response;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class TimePaperResponseDto {

  private final Long id;
  private final String title;
  private final String recipientEmail;

  public static TimePaperResponseDto from(TimePaper timePaper) {
    return TimePaperResponseDto.builder()
        .id(timePaper.getId())
        .title(timePaper.getTitle())
        .recipientEmail(timePaper.getRecipientEmail())
        .build();
  }
}
