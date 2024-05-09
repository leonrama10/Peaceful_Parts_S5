package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "point")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "point")
    private String point;

    public Point() {}

    public Point(Long id) {
        this.id = id;
    }

    public Point(Long id, String point) {
        this.id = id;
        this.point = point;
    }

    public String getPoint() {
        return point;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
