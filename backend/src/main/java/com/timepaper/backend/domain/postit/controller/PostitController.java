package com.timepaper.backend.domain.postit.controller;

import com.timepaper.backend.domain.postit.dto.PostitCreateRequestDto;
import com.timepaper.backend.domain.postit.service.PostitService;
import com.timepaper.backend.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostitController {

  private final PostitService postitService;

  @PostMapping("/timepapers/{timepaperId}/postits")
  public void createPostit(
      @PathVariable Long timepaperId,
      @RequestPart(value = "data") PostitCreateRequestDto requestDto,
      @RequestPart(value = "image", required = false) MultipartFile image,
      @AuthenticationPrincipal User user
  ) {

  }
}
