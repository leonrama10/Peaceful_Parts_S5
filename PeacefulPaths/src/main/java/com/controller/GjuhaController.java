package com.controller;

import com.entity.Gjuha;
import com.service.GjuhaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gjuha")

public class GjuhaController {
    private final GjuhaService gjuhaService;

    public GjuhaController(GjuhaService gjuhaService){
        this.gjuhaService = gjuhaService;
    }

    @GetMapping
    public List<Gjuha> getGjuhet(){
        return gjuhaService.getAllGjuhet();
    }

    @PostMapping
    public Gjuha createGjuha(@RequestBody Gjuha gjuha){
        return gjuhaService.saveGjuhet(gjuha);
    }
}
