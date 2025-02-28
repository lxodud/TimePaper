package com.timepaper.backend.domain.my.dto.response;


import com.timepaper.backend.domain.postit.entity.Postit;
import com.timepaper.backend.domain.user.entity.User;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyInfoResponseDto {
  private final String recipientEmail;

  public static MyInfoResponseDto from(User entity){
    return MyInfoResponseDto.builder()
        .recipientEmail(entity.getEmail())
        .build();
  }


  // Builder
  @Builder
  public MyInfoResponseDto(String recipientEmail) {
    this.recipientEmail = recipientEmail;
  }

  // Getters
  public String getRecipientEmail() {
    return recipientEmail;
  }
}
