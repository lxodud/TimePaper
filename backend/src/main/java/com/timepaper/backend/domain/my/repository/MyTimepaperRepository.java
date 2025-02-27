package com.timepaper.backend.domain.my.repository;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface MyTimepaperRepository extends JpaRepository<TimePaper, UUID> {
  // 특정 사용자의 TimePaper 조회
  List<TimePaper> findByCreatorId(Long creatorId);
}
