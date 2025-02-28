package com.timepaper.backend.domain.my.repository;

import com.timepaper.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyInfoRepository extends JpaRepository<User, Long> {

  User findByEmail(String email);
}
