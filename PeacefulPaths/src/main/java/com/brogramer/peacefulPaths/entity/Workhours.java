package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "workhours")
public class Workhours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hour")
    private LocalTime hour;

    public Workhours() {}

    public Workhours(Long id) {
        this.id = id;
    }

    public Workhours(Long id, LocalTime hour) {
        this.id = id;
        this.hour = hour;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getHour() {
        return hour;
    }

    public void setHour(LocalTime hour) {
        this.hour = hour;
    }
}
