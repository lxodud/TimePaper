package com.timepaper.backend.domain.timepaper.entity;

import com.timepaper.backend.domain.user.entity.User;
import com.timepaper.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "time_papers")
public class TimePaper extends BaseTimeEntity {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(columnDefinition = "BINARY(16)")
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "creator_id", nullable = false)
  private User creator;

  @Column(nullable = false, length = 30)
  private String title;

  private String recipientEmail;

  private LocalDateTime releaseDate;

  @Builder
  public TimePaper(User creator, String title, String recipientEmail) {
    this.creator = creator;
    this.title = title;
    this.recipientEmail = recipientEmail;
  }
}
