package com.service;

import com.entity.Ofertat;
import com.repository.OfertatRepository;

import java.util.List;

public class OfertatService {
    private final OfertatRepository ofertatRepository;

    public OfertatService(OfertatRepository ofertatRepository){
        this.ofertatRepository = ofertatRepository;
    }
    public List<Ofertat> getAllOfertat(){
        return ofertatRepository.findAll();
    }
    public Ofertat createOfertat(Ofertat ofertat){
        return ofertatRepository.save(ofertat);
    }
}
