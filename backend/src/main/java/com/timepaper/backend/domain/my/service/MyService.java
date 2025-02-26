package com.timepaper.backend.domain.my.service;

import com.timepaper.backend.domain.my.dto.response.MyPostitListResponseDto;
import com.timepaper.backend.domain.my.dto.response.MyTimepaperListResponseDto;
import com.timepaper.backend.domain.my.repository.MyPostitRepository;
import com.timepaper.backend.domain.my.repository.MyTimepaperRepository;
import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyService {
  private final MyTimepaperRepository myTimepaperRepository;
  private final MyPostitRepository myPostitRepository;
  public List<MyTimepaperListResponseDto> readMyTimepapers() {
    return myTimepaperRepository.findAll().stream() // 인스턴스를 통해 findAll() 호출
        .map(MyTimepaperListResponseDto::from)
        .toList();
  }

  public List<MyPostitListResponseDto> readMyPostits(Long timPaperId) {
    return myPostitRepository.findByTimePaperId(timPaperId).stream() // 인스턴스를 통해 findAll() 호출
        .map(MyPostitListResponseDto::from)
        .toList();
  }

}