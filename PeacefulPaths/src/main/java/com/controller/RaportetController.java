package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Raportet;
import com.service.RaportetService;

import java.util.List;

@RestController
@RequestMapping("/api/raportet")
public class RaportetController {
    @Autowired
    private RaportetService service;

    @GetMapping
    public List<Raportet> getAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Raportet> create(@RequestBody Raportet raport) {
        return ResponseEntity.ok(service.save(raport));
    }
}
 