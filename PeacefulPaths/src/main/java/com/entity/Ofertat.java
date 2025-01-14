package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Ofertat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kodiOfertes;
    private Double zbritja;
    private LocalDate dataFillimit;
    private LocalDate dataMbarimit;
    private Boolean perdorimi;

    private Long getId(){
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKodiOfertes() {
        return kodiOfertes;
    }

    public void setKodiOfertes(String kodiOfertes) {
        this.kodiOfertes = kodiOfertes;
    }

    public Double getZbritja() {
        return zbritja;
    }

    public void setZbritja(Double zbritja) {
        this.zbritja = zbritja;
    }

    public LocalDate getDataFillimit() {
        return dataFillimit;
    }

    public void setDataFillimit(LocalDate dataFillimit) {
        this.dataFillimit = dataFillimit;
    }

    public LocalDate getDataMbarimit() {
        return dataMbarimit;
    }

    public void setDataMbarimit(LocalDate dataMbarimit) {
        this.dataMbarimit = dataMbarimit;
    }

    public Boolean getPerdorimi() {
        return perdorimi;
    }

    public void setPerdorimi(Boolean perdorimi) {
        this.perdorimi = perdorimi;
    }
}
