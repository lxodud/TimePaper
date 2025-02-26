package com.timepaper.backend.domain.postit.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Setter
public class PostitCreateRequestDto {

  @NotEmpty
  @Length(max = 20)
  String author;

  @NotEmpty
  @Length(max = 155)
  String content;

  String staticImagePath;

}
