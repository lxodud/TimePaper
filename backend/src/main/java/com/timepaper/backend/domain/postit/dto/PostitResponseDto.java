package com.timepaper.backend.domain.postit.dto;

import com.timepaper.backend.domain.postit.entity.Postit;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostitResponseDto {

  private Long postitId;
  private String author;
  private Long authorId;
  private String content;
  private LocalDateTime createdAt;
  private String imageUrl;

  public PostitResponseDto from(Postit postit) {
    return PostitResponseDto.builder()
               .postitId(postit.getId())
               .author(postit.getAuthorName())
               .authorId(postit.getAuthor().getId())
               .content(postit.getContent())
               .createdAt(postit.getCreatedAt())
               .imageUrl(postit.getImageUrl())
               .build();
  }
}
