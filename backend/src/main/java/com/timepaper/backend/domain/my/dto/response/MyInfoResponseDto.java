package com.timepaper.backend.domain.my.dto.response;


import com.timepaper.backend.domain.user.entity.ROLE;
import com.timepaper.backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyInfoResponseDto {

  private final String email;
  private final ROLE role;

  public static MyInfoResponseDto from(User entity) {
    return MyInfoResponseDto.builder()
        .email(entity.getEmail())
        .role(entity.getRole())
        .build();
  }

}
