package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.AnalizaPerdoruesve;
import com.service.AnalizaPerdoruesveService;

import java.util.List;

@RestController
@RequestMapping("/api/analiza")
public class AnalizaPerdoruesveController {
    @Autowired
    private AnalizaPerdoruesveService service;

    @GetMapping
    public List<AnalizaPerdoruesve> getAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<AnalizaPerdoruesve> create(@RequestBody AnalizaPerdoruesve analiza) {
        return ResponseEntity.ok(service.save(analiza));
    }
}