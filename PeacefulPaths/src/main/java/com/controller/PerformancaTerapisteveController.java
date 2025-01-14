package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.PerformancaTerapisteve;
import com.service.PerformancaTerapisteveService;

import java.util.List;

@RestController
@RequestMapping("/api/performanca")
public class PerformancaTerapisteveController {
    @Autowired
    private PerformancaTerapisteveService service;

    @GetMapping
    public List<PerformancaTerapisteve> getAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<PerformancaTerapisteve> create(@RequestBody PerformancaTerapisteve performanca) {
        return ResponseEntity.ok(service.save(performanca));
    }
}