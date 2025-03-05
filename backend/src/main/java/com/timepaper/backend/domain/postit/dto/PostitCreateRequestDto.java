package com.timepaper.backend.domain.postit.dto;

import com.timepaper.backend.domain.postit.entity.Postit;
import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.user.entity.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Setter
@Getter
public class PostitCreateRequestDto {

  @NotEmpty
  @Length(max = 20, message = "작성자 이름은 최대 20자까지 입력할 수 있습니다.")
  private String authorName;

  @NotEmpty
  @Length(max = 155, message = "내용은 최대 155자까지 입력할 수 있습니다.")
  private String content;

  private String imageUrl;

  public Postit toEntity(TimePaper timePaper, User user, String s3Key, String s3ImageUrl) {
    if (s3ImageUrl != null) {
      imageUrl = s3ImageUrl;
    }

    return Postit.builder()
        .timePaper(timePaper)
        .author(user)
        .authorName(authorName)
        .content(content)
        .s3Key(s3Key)
        .imageUrl(imageUrl)
        .build();
  }
}
