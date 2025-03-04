package com.timepaper.backend.domain.postit.repository;

import com.timepaper.backend.domain.postit.entity.Postit;
import com.timepaper.backend.domain.user.entity.User;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostitRepository extends JpaRepository<Postit, Long> {

  Page<Postit> findAllByTimePaperId(UUID timePaperId, Pageable pageable);

  List<Postit> findAllByAuthor(User author);
}
