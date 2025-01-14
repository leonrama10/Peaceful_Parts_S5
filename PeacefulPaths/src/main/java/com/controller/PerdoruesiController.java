package com.controller;

import com.entity.Perdoruesi;
import com.service.PerdoruesiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/perdoruesi")
public class PerdoruesiController {
    private final PerdoruesiService perdoruesiService;

    public PerdoruesiController(PerdoruesiService perdoruesiService){
        this.perdoruesiService = perdoruesiService;
    }
    @GetMapping
    public List<Perdoruesi> getPerdoruesit(){
        return perdoruesiService.getAllPerdoruesit();
    }
    @PostMapping
    public Perdoruesi createPerdoruesi(@RequestBody Perdoruesi perdoruesi){
        return perdoruesiService.savePerdoruesi(perdoruesi);
    }
}
