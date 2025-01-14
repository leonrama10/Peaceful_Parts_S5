package com.service;

import com.entity.Pagesat;
import com.repository.PagesatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PagesatService {
    private final PagesatRepository pagesatRepository;

    public PagesatService(PagesatRepository pagesatRepository){
        this.pagesatRepository = pagesatRepository;
    }

    public List<Pagesat> getAllPagesat(){
        return pagesatRepository.findAll();
    }

    public Pagesat createPagesat(Pagesat pagesat){
        return pagesatRepository.save(pagesat);
    }
}
