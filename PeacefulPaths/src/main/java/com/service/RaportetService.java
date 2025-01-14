package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Raportet;
import com.repository.RaportetRepository;

import java.util.List;

@Service
public class RaportetService {
    @Autowired
    private RaportetRepository repository;

    public List<Raportet> findAll() {
        return repository.findAll();
    }

    public Raportet save(Raportet raport) {
        return repository.save(raport);
    }
}