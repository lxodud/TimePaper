package com.timepaper.backend.domain.postit.service;

import com.timepaper.backend.domain.postit.repository.PostitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostitService {

  private final PostitRepository postitRepository;

}
