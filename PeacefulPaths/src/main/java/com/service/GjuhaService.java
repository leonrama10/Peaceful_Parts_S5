package com.service;

import com.entity.Gjuha;
import com.repository.GjuhaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GjuhaService {
    private final GjuhaRepository gjuhaRepository;

    public GjuhaService(GjuhaRepository gjuhaRepository){
        this.gjuhaRepository = gjuhaRepository;
    }
    public List<Gjuha> getAllGjuhet(){
        return gjuhaRepository.findAll();
    }
    public Gjuha saveGjuhet(Gjuha gjuha){
        return gjuhaRepository.save(gjuha);
    }
}
