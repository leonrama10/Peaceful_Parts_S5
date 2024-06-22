package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
public class Advice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "advice_text")
    private String adviceText;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private User therapist_id;

    @DateTimeFormat(pattern = "yyyy,MM,dd,HH,mm,ss")
    @Column(name = "date_added", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateAdded;

    public Advice() {}

    public Advice(Long id, User user, String adviceText, User therapist_id, LocalDateTime dateAdded) {
        this.id = id;
        this.user = user;
        this.adviceText = adviceText;
        this.therapist_id = therapist_id;
        this.dateAdded = dateAdded;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public Long getId() {
        return id;
    }

    public User getTherapist_id() {
        return therapist_id;
    }

    public void setTherapist_id(User therapist_id) {
        this.therapist_id = therapist_id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAdviceText() {
        return adviceText;
    }

    public void setAdviceText(String adviceText) {
        this.adviceText = adviceText;
    }

}
