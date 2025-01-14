package com.entity;

import jakarta.persistence.*;

@Entity
public class SessionManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;

    public SessionManager() {
    }

    public SessionManager(String sessionId) {
        this.sessionId = sessionId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public void startSession(String sessionId) {
        this.sessionId = sessionId;
        System.out.println("Session started: " + sessionId);
    }

    public void init() {
        System.out.println("Initializing SessionManager...");
    }
}