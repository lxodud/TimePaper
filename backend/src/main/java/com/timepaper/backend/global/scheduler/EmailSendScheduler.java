package com.timepaper.backend.global.scheduler;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.timepaper.repository.TimePaperRepository;
import com.timepaper.backend.global.emailsender.EmailSendManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailSendScheduler {

  private final TimePaperRepository timePaperRepository;
  private final EmailSendManager emailSendManager;

  @Value("${TIME_PAPER_URL}")
  private String timePaperUrl;

  @Scheduled(cron = "0 0 0 * * ?")
  public void sendEmail() {
    List<TimePaper> timepapers = timePaperRepository.findAllByReleaseDateToday()
                                     .stream()
                                     .toList();

    // TODO: 이메일 전송
    timepapers.forEach(timePaper -> {
      String url = timePaperUrl + String.valueOf(timePaper.getId());
      emailSendManager.sendEmail(timePaper.getRecipientEmail(), "타임페이퍼 오픈", url);
    });

  }
}
