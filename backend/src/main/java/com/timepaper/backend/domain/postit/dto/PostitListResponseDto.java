package com.timepaper.backend.domain.postit.dto;

import com.timepaper.backend.domain.postit.entity.Postit;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
@Builder
public class PostitListResponseDto {

  private List<PostitResponseDto> postits;
  private Boolean hasNext;

  public static PostitListResponseDto from(Page<Postit> postitPage) {
    List<PostitResponseDto> postitDtos = postitPage.getContent().stream()
                                             .map(PostitResponseDto::from)
                                             .collect(Collectors.toList());

    return PostitListResponseDto.builder()
               .postits(postitDtos)
               .hasNext(postitPage.hasNext())
               .build();
  }
}
