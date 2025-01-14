package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Terapisti")
public class Terapisti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private Users user;

    private String emri;
    private String specializimi;
    private Float vleresimi;


    public Terapisti(Users user, String emri, String specializimi, Float vleresimi) {
        this.user = user;
        this.emri = emri;
        this.specializimi = specializimi;
        this.vleresimi = vleresimi;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Users getUser () {
        return user;
    }

    public void setUser (Users user) {
        this.user = user;
    }

    public String getEmri() {
        return emri;
    }

    public void setEmri(String emri) {
        this.emri = emri;
    }

    public String getSpecializimi() {
        return specializimi;
    }

    public void setSpecializimi(String specializimi) {
        this.specializimi = specializimi;
    }

    public Float getVleresimi() {
        return vleresimi;
    }

    public void setVleresimi(Float vleresimi) {
        this.vleresimi = vleresimi;
    }
}