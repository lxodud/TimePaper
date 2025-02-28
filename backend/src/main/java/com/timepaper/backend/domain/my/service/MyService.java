package com.timepaper.backend.domain.my.service;

import com.timepaper.backend.domain.my.dto.response.MyInfoResponseDto;
import com.timepaper.backend.domain.my.dto.response.MyPostitListResponseDto;
import com.timepaper.backend.domain.my.dto.response.MyTimepaperListResponseDto;
import com.timepaper.backend.domain.my.repository.MyPostitRepository;
import com.timepaper.backend.domain.my.repository.MyTimepaperRepository;
import com.timepaper.backend.domain.my.repository.MyInfoRepository;
import com.timepaper.backend.domain.user.entity.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyService {
  private final MyTimepaperRepository myTimepaperRepository;
  private final MyPostitRepository myPostitRepository;
  private final MyInfoRepository myInfoRepository;

  public List<MyTimepaperListResponseDto> readMyTimepapers(User user) {
    return myTimepaperRepository.findByCreatorId(user.getId()).stream() // 인스턴스를 통해 findAll() 호출
        .map(MyTimepaperListResponseDto::from)
        .toList();
  }

  public List<MyPostitListResponseDto> readMyPostits(User user) {
    return myPostitRepository.findByAuthorId(user.getId()).stream() // 인스턴스를 통해 findAll() 호출
        .map(MyPostitListResponseDto::from)
        .toList();
  }
  public MyInfoResponseDto readMyInfo(User user) {
    User foundUser = myInfoRepository.findByEmail(user.getEmail());
    return MyInfoResponseDto.from(foundUser);
  }
}