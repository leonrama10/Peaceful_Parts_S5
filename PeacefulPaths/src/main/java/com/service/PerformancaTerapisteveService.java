package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.PerformancaTerapisteve;
import com.repository.PerformancaTerapisteveRepository;

import java.util.List;

@Service
public class PerformancaTerapisteveService {
    @Autowired
    private PerformancaTerapisteveRepository repository;

    public List<PerformancaTerapisteve> findAll() {
        return repository.findAll();
    }

    public PerformancaTerapisteve save(PerformancaTerapisteve performanca) {
        return repository.save(performanca);
    }
}