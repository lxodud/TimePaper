package com.timepaper.backend.domain.my.repository;

import com.timepaper.backend.domain.postit.entity.Postit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyPostitRepository extends JpaRepository<Postit, Long> {
List<Postit> findByTimePaperId(Long timePaperId);
}
