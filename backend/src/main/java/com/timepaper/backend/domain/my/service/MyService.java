package com.timepaper.backend.domain.my.service;

import com.timepaper.backend.domain.my.dto.response.MyInfoResponseDto;
import com.timepaper.backend.domain.my.dto.response.MyPostitListResponseDto;
import com.timepaper.backend.domain.my.dto.response.MyTimepaperListResponseDto;
import com.timepaper.backend.domain.postit.repository.PostitRepository;
import com.timepaper.backend.domain.timepaper.repository.TimePaperRepository;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.domain.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyService {

  private final UserRepository userRepository;
  private final TimePaperRepository timePaperRepository;
  private final PostitRepository postitRepository;

  //TODO: 예외처리, 임시
  public MyInfoResponseDto getMyInfo(User user) {
    User User = (User) userRepository.findByEmail(user.getEmail())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일"));
    return MyInfoResponseDto.from(User);
  }

  public List<MyTimepaperListResponseDto> getMyTimepapers(User user) {
    return timePaperRepository.findByCreator(user).stream()
        .map(MyTimepaperListResponseDto::from)
        .toList();
  }

  public List<MyPostitListResponseDto> getMyPostits(User user) {
    return postitRepository.findAllByAuthor(user).stream()
        .map(MyPostitListResponseDto::from)
        .toList();
  }


}