package com.timepaper.backend.domain.user.dto.request;

import com.timepaper.backend.domain.user.entity.ROLE;
import com.timepaper.backend.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpRequestDto {

  private String email;
  private String password;

  //dto -> entity
  public User toUser(String encodedPassword) {
    return User.builder()
        .email(this.getEmail())
        .password(encodedPassword)
        .role(ROLE.ROLE_USER)
        .build();
  }

}
