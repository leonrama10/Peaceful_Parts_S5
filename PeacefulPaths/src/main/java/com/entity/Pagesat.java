package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Pagesat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double shuma;
    private LocalDate dataPageses;
    private String metodaPageses;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Double getShuma() {
        return shuma;
    }

    public void setShuma(Double shuma) {
        this.shuma = shuma;
    }

    public LocalDate getDataPageses() {
        return dataPageses;
    }

    public void setDataPageses(LocalDate dataPageses) {
        this.dataPageses = dataPageses;
    }

    public String getMetodaPageses() {
        return metodaPageses;
    }

    public void setMetodaPageses(String metodaPageses) {
        this.metodaPageses = metodaPageses;
    }
}
