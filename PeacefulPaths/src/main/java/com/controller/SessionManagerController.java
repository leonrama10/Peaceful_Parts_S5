package com.controller;

import org.springframework.web.bind.annotation.*;
import com.service.SessionManagerService;

@RestController
@RequestMapping("/api/session-manager")
public class SessionManagerController {

    private final SessionManagerService sessionManagerService;

    public SessionManagerController(SessionManagerService sessionManagerService) {
        this.sessionManagerService = sessionManagerService;
    }

    @PostMapping("/start")
    public String startSession(@RequestParam String sessionId) {
        sessionManagerService.startSession(sessionId);
        return "Session started: " + sessionId;
    }

    @GetMapping("/init")
    public String initSessionManager() {
        sessionManagerService.init();
        return "SessionManager initialized.";
    }
}
