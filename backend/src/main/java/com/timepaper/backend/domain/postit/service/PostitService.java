package com.timepaper.backend.domain.postit.service;

import com.timepaper.backend.domain.postit.dto.PostitCreateRequestDto;
import com.timepaper.backend.domain.postit.repository.PostitRepository;
import com.timepaper.backend.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostitService {

  private final PostitRepository postitRepository;

  public void createPostit(
      User user,
      PostitCreateRequestDto requestDto,
      MultipartFile image
  ) {

  }
}
