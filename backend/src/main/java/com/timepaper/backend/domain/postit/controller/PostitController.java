package com.timepaper.backend.domain.postit.controller;

import com.timepaper.backend.domain.postit.dto.PostitCreateRequestDto;
import com.timepaper.backend.domain.postit.dto.PostitListResponseDto;
import com.timepaper.backend.domain.postit.service.PostitService;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.global.dto.ApiResponse;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

  @PostMapping("/timepapers/{timePaperId}/postits")
  public ResponseEntity<ApiResponse<Void>> createPostit(
      @PathVariable String timePaperId,
      @AuthenticationPrincipal User user,
      @Valid @RequestPart(value = "data") PostitCreateRequestDto requestDto,
      @RequestPart(value = "image", required = false) MultipartFile image
  ) {
    postitService.createPostit(UUID.fromString(timePaperId), user, requestDto, image);
    return ResponseEntity.status(HttpStatus.CREATED)
               .body(ApiResponse.ok("포스트잇 생성 성공", "SUCCESS", null));
  }

  @GetMapping("timepapers/{timePaperId}/postits")
  public ResponseEntity<ApiResponse<PostitListResponseDto>> getPostit(
      @PathVariable String timePaperId,
      Pageable pageable
  ) {
    return ResponseEntity.ok(
        ApiResponse.ok(
            "조회 성공",
            "SUCCESS",
            postitService.getPostit(UUID.fromString(timePaperId), pageable)
        )
    );
  }

  @DeleteMapping("postits/{postitId}")
  public ResponseEntity<ApiResponse<Void>> deletePostit(
      @PathVariable Long postitId,
      @AuthenticationPrincipal User user
  ) {
    postitService.deletePostit(postitId, user.getId());
    return ResponseEntity.status(HttpStatus.NO_CONTENT)
               .body(ApiResponse.ok("포스트잇 생성 성공", "SUCCESS", null));
  }
}
