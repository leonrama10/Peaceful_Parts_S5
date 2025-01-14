package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Klienti")
public class Klienti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private Users user;

    private String emri;
    private Integer mosha;
    private String gjinia;
    private String historia_mjekesore;
    private Boolean VIP = false;


    public Klienti(Users user, String emri, Integer mosha, String gjinia, String historia_mjekesore, Boolean VIP) {
        this.user = user;
        this.emri = emri;
        this.mosha = mosha;
        this.gjinia = gjinia;
        this.historia_mjekesore = historia_mjekesore;
        this.VIP = VIP;
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

    public Integer getMosha() {
        return mosha;
    }

    public void setMosha(Integer mosha) {
        this.mosha = mosha;
    }

    public String getGjinia() {
        return gjinia;
    }

    public void setGjinia(String gjinia) {
        this.gjinia = gjinia;
    }

    public String getHistoria_mjekesore() {
        return historia_mjekesore;
    }

    public void setHistoria_mjekesore(String historia_mjekesore) {
        this.historia_mjekesore = historia_mjekesore;
    }

    public Boolean getVIP() {
        return VIP;
    }

    public void setVIP(Boolean VIP) {
        this.VIP = VIP;
    }
}