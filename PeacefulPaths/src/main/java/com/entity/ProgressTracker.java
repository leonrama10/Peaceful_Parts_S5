package com.entity;

import jakarta.persistence.*;

@Entity
public class ProgressTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientId;
    private String progress;

    public ProgressTracker() {
    }

    public ProgressTracker(String clientId, String progress) {
        this.clientId = clientId;
        this.progress = progress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public void trackProgress(String clientId, String progress) {
        this.clientId = clientId;
        this.progress = progress;
        System.out.println("Tracking progress for client " + clientId + ": " + progress);
    }
}