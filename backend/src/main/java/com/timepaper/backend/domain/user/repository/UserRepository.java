package com.timepaper.backend.domain.user.repository;

import com.timepaper.backend.domain.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<UserDetails> findByEmail(String email);

  @Query("SELECT u.id FROM User u WHERE u.email = :email")
  Optional<Long> findUserIdByEmail(@Param("email") String email);

  @Query("SELECT CASE WHEN COUNT(u) > 0 THEN TRUE ELSE FALSE END FROM User u WHERE u.email = :email")
  boolean isExistEmail(@Param("email") String email);
}
