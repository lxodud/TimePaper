package com.timepaper.backend.domain.my.repository;

import com.timepaper.backend.domain.timepaper.entity.TimePaper;
import java.util.Arrays;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyTimepaperRepository extends JpaRepository<TimePaper,Long> {

}
