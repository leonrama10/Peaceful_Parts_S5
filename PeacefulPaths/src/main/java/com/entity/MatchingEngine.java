package com.entity;

import jakarta.persistence.*;

@Entity
public class MatchingEngine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientId;
    private String therapistId;

    public MatchingEngine() {
    }

    public MatchingEngine(String clientId, String therapistId) {
        this.clientId = clientId;
        this.therapistId = therapistId;
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

    public String getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(String therapistId) {
        this.therapistId = therapistId;
    }

    public void matchClient(String clientId, String therapistId) {
        this.clientId = clientId;
        this.therapistId = therapistId;
        System.out.println("Matched client " + clientId + " with therapist " + therapistId);
    }

    public void configure(String config) {
        System.out.println("Configuring MatchingEngine with: " + config);
    }
}