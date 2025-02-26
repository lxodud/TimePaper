package com.timepaper.backend.domain.postit.controller;

import com.timepaper.backend.domain.postit.service.PostitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class PostitController {

  private final PostitService postitService;

}
