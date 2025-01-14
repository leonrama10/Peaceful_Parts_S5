package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.AnalizaPerdoruesve;
import com.repository.AnalizaPerdoruesveRepository;

import java.util.List;

@Service
public class AnalizaPerdoruesveService {
    @Autowired
    private AnalizaPerdoruesveRepository repository;

    public List<AnalizaPerdoruesve> findAll() {
        return repository.findAll();
    }

    public AnalizaPerdoruesve save(AnalizaPerdoruesve analiza) {
        return repository.save(analiza);
    }
}