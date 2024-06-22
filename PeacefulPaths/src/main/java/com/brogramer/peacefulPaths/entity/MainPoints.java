package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "main_points")
public class MainPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "main_points_point",
            joinColumns = @JoinColumn(name = "main_points_id"),
            inverseJoinColumns = @JoinColumn(name = "point_id"))
    private List<Point> point;

    public MainPoints() {}

    public MainPoints(int id) {
        this.id = id;
    }

    public MainPoints(int id, List<Point> point) {
        this.id = id;
        this.point = point;
    }

    public List<Point> getPoint() {
        return point;
    }

    public void setPoint(List<Point> point) {
        this.point = point;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
