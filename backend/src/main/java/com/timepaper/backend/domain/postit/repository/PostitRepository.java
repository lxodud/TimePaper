package com.timepaper.backend.domain.postit.repository;

import com.timepaper.backend.domain.postit.entity.Postit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostitRepository extends JpaRepository<Postit, Long> {

}
