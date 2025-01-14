package com.entity;

import jakarta.persistence.*;

@Entity
public class Perdoruesi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long perdoruesiID;

    @ManyToOne
    @JoinColumn(name = "gjuhaEZgjedhur")
    private Gjuha gjuhaEZgjedhur;

    public Long getPerdoruesiID() {
        return perdoruesiID;
    }

    public void setPerdoruesiID(Long perdoruesiID) {
        this.perdoruesiID = perdoruesiID;
    }

    public Gjuha getGjuhaEZgjedhur() {
        return gjuhaEZgjedhur;
    }

    public void setGjuhaEZgjedhur(Gjuha gjuhaEZgjedhur) {
        this.gjuhaEZgjedhur = gjuhaEZgjedhur;
    }
}
