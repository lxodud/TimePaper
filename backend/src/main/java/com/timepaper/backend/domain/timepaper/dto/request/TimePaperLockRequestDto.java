package com.timepaper.backend.domain.timepaper.dto.request;

import jakarta.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimePaperLockRequestDto {

  private UUID timePaperId;

  @Email
  private String recipientEmail;

  private LocalDateTime releaseDate;



}
