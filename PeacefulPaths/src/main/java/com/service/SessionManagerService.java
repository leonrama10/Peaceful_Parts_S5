package com.service;

import org.springframework.stereotype.Service;

@Service
public class SessionManagerService {

    public void init() {
        System.out.println("SessionManager initialized.");
    }

    public void startSession(String sessionId) {
        System.out.println("Session started with ID: " + sessionId);
    }
}
