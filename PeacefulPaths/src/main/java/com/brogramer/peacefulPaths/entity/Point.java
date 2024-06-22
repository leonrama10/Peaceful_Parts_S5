package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "point")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "point")
    private String point;

    public Point() {}

    public Point(int id) {
        this.id = id;
    }

    public Point(int id, String point) {
        this.id = id;
        this.point = point;
    }

    public String getPoint() {
        return point;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
