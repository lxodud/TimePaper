package com.timepaper.backend.domain.my.dto.response;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyTimepaperListResponseDto {
  private final Long rollingPaperId;
  private final String creator;
  private final String title;
  private final LocalDateTime createdAt;
  private final boolean isLocked;

  public static MyTimepaperListResponseDto from(TimePaper entity){
    return MyTimepaperListResponseDto.builder()
        .rollingPaperId(entity.getId())
        .creator(String.valueOf(entity.getCreator()))
        .title(entity.getTitle())
        .createdAt(entity.getCreatedAt())
        .isLocked(entity.getReleaseDate().isAfter(LocalDateTime.now()))
        .build();
  }
}
