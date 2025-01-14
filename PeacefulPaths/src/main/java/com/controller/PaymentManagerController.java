package com.controller;

import com.entity.Ofertat;
import com.entity.Pagesat;
import com.repository.OfertatRepository;
import com.repository.PagesatRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

public class PaymentManagerController {
    private final PagesatRepository pagesatRepository;
    private final OfertatRepository ofertatRepository;

    public PaymentManagerController(PagesatRepository pagesatRepository, OfertatRepository ofertatRepository){
        this.pagesatRepository = pagesatRepository;
        this.ofertatRepository = ofertatRepository;
    }

    @GetMapping("/pagesat")
    public List<Pagesat> getAllPagesat(){
        return pagesatRepository.findAll();
    }

    @PostMapping("/pagesat")
    public Pagesat createPagesat(@RequestBody Pagesat pagesat){
        return pagesatRepository.save(pagesat);
    }

    @GetMapping("/ofertat")
    public List<Ofertat> getAllOfertat(){
        return ofertatRepository.findAll();
    }

    @PostMapping("/ofertat")
    public Ofertat createOfertat(@RequestBody Ofertat ofertat){
        return ofertatRepository.save(ofertat);
    }
}
