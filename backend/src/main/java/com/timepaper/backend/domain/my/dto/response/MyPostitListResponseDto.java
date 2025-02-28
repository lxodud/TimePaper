package com.timepaper.backend.domain.my.dto.response;

import com.timepaper.backend.domain.postit.entity.Postit;
import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyPostitListResponseDto {
  private final Long postitId;
  private final String creator;
  private final LocalDateTime createdAt;

  public static MyPostitListResponseDto from(Postit entity){
    return MyPostitListResponseDto.builder()
        .postitId(entity.getId())
        .creator(entity.getAuthorName())
        .createdAt(entity.getCreatedAt())
        .build();
  }
}
