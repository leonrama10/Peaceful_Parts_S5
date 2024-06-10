package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
public class Advice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    private String adviceText;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private User therapist_id;

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
