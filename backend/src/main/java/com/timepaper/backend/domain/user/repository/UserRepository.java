package com.timepaper.backend.domain.user.repository;

import com.timepaper.backend.domain.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<UserDetails> findByEmail(String email);
}
