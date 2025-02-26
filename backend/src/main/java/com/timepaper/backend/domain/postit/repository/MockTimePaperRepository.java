package com.timepaper.backend.domain.postit.repository;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MockTimePaperRepository extends JpaRepository<TimePaper, Long> {

}
