package com.timepaper.backend.domain.postit.service;

import com.timepaper.backend.domain.postit.dto.PostitCreateRequestDto;
import com.timepaper.backend.domain.postit.dto.PostitListResponseDto;
import com.timepaper.backend.domain.postit.entity.Postit;
import com.timepaper.backend.domain.postit.repository.PostitRepository;
import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.timepaper.repository.TimePaperRepository;
import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.global.s3.service.S3Service;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostitService {

  private final PostitRepository postitRepository;
  private final S3Service s3Service;
  private final TimePaperRepository timePaperRepository;

  @Transactional
  public void createPostit(
      UUID timePaperId,
      User user,
      PostitCreateRequestDto requestDto,
      MultipartFile image
  ) {
    String s3ImageUrl = null;
    String s3Key = null;

    if (image != null) {
      Map<String, String> uploadResult = s3Service.uploadFile(image);
      s3ImageUrl = uploadResult.get("imageUrl");
      s3Key = uploadResult.get("s3Key");
    }

    TimePaper timePaper = timePaperRepository.findById(timePaperId)
                              .orElseThrow(() -> new IllegalArgumentException());

    Postit postit = requestDto.toEntity(timePaper, user, s3Key, s3ImageUrl);

    postitRepository.save(postit);
  }

  public PostitListResponseDto getPostit(UUID timePaperId, Pageable pageable) {
    Page<Postit> postitsPage = postitRepository.findAllByTimePaperId(timePaperId, pageable);

    return PostitListResponseDto.from(postitsPage);
  }
}
