package com.timepaper.backend.domain.timepaper.dto.request;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimePaperCreateRequestDto {

  @NotBlank(message = "타이틀이 비어있을 수 없습니다.")
  @Size(max = 30, message = "타이틀은 최대 30자까지 허용됩니다.")
  private String title;
}
