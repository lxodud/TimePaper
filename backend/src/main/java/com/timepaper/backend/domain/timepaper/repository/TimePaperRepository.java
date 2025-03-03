package com.timepaper.backend.domain.timepaper.repository;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import com.timepaper.backend.domain.user.entity.User;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimePaperRepository extends JpaRepository<TimePaper, UUID> {

  List<TimePaper> findByCreator(User user);
}
