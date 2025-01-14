package com.entity;

import jakarta.persistence.*;

@Entity
public class Gjuha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gjuhaID;

    @Column(nullable = false, unique = true)
    private String emri;

    @Column(nullable = false, unique = true)
    private String kodi;

    public Long getGjuhaID(){
        return gjuhaID;
    }

    public void setGjuhaID(Long gjuhaID) {
        this.gjuhaID = gjuhaID;
    }

    public String getEmri() {
        return emri;
    }

    public void setEmri(String emri) {
        this.emri = emri;
    }

    public String getKodi() {
        return kodi;
    }

    public void setKodi(String kodi) {
        this.kodi = kodi;
    }
}
