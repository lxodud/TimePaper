package com.timepaper.backend.domain.timepaper.repository;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimePaperRepository extends JpaRepository<TimePaper, UUID> {

}
