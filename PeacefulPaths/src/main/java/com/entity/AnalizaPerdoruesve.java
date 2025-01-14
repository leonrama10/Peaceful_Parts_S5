package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "AnalizaPerdoruesve")
public class AnalizaPerdoruesve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "numri_klienteve_aktive", nullable = false)
    private Integer numriKlienteveAktive = 0;

    @Column(name = "perseritja_seancave", nullable = false)
    private Double perseritjaSeancave = 0.00;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getNumriKlienteveAktive() {
        return numriKlienteveAktive;
    }

    public void setNumriKlienteveAktive(Integer numriKlienteveAktive) {
        this.numriKlienteveAktive = numriKlienteveAktive;
    }

    public Double getPerseritjaSeancave() {
        return perseritjaSeancave;
    }

    public void setPerseritjaSeancave(Double perseritjaSeancave) {
        this.perseritjaSeancave = perseritjaSeancave;
    }
}