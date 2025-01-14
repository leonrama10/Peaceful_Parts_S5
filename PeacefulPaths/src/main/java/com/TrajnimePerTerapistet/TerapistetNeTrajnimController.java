package com.TrajnimePerTerapistet;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/terapistet-trajnimet")
public class TerapistetNeTrajnimController {

    private final com.TrajnimePerTerapistet.TerapistetNeTrajnimService service;

    public TerapistetNeTrajnimController(com.TrajnimePerTerapistet.TerapistetNeTrajnimService service) {
        this.service = service;
    }

    @GetMapping
    public List<TerapistetNeTrajnim> getAll() {
        return service.getAll();
    }
    @PostMapping
    public TerapistetNeTrajnim save(@RequestBody TerapistetNeTrajnim entity) {
        return service.save(entity);
    }
}
