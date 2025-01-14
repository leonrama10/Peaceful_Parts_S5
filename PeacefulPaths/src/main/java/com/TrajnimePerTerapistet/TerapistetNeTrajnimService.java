package com.TrajnimePerTerapistet;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TerapistetNeTrajnimService {

    private final TerapistetNeTrajnimRepository repository;

    public TerapistetNeTrajnimService(TerapistetNeTrajnimRepository repository) {
        this.repository = repository;
    }

    public List<TerapistetNeTrajnim> getAll() {
        return repository.findAll();
    }

    public TerapistetNeTrajnim save(TerapistetNeTrajnim entity) {
        return repository.save(entity);
    }
}
