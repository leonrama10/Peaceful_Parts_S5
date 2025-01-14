package com.service;

import com.entity.Perdoruesi;
import com.repository.PerdoruesiRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerdoruesiService {
    private final PerdoruesiRepository perdoruesiRepository;

    public PerdoruesiService(PerdoruesiRepository perdoruesiRepository){
        this.perdoruesiRepository = perdoruesiRepository;
    }

    public List<Perdoruesi> getAllPerdoruesit(){
        return perdoruesiRepository.findAll();
    }

    public Perdoruesi savePerdoruesi(Perdoruesi perdoruesi){
        return perdoruesiRepository.save(perdoruesi);
    }
}
