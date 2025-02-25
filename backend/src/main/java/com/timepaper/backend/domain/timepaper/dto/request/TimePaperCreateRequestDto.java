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

  @NotBlank(message = "수신자 이메일은 필수입니다.")
  @Email(message = "유효한 이메일 형식이어야 합니다.")
  private String recipientEmail;

  public TimePaper toEntity() {
    return TimePaper.builder()
        .title(this.title)
        .recipientEmail(this.recipientEmail)
        .build();
  }
}
