package com.timepaper.backend.global.scheduler;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.timepaper.repository.TimePaperRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailSendScheduler {

  private final TimePaperRepository timePaperRepository;

  @Scheduled(cron = "0 0 0 * * ?")
  public void sendEmail() {
    List<String> recipientEmails = timePaperRepository.findAllByReleaseDateToday()
                                       .stream()
                                       .map((TimePaper::getRecipientEmail))
                                       .toList();

    // TODO: 이메일 전송
  }
}
