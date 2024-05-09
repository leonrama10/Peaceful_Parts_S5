package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table(name = "main_points")
public class MainPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "main_points_point",
            joinColumns = @JoinColumn(name = "main_points_id"),
            inverseJoinColumns = @JoinColumn(name = "point_id"))
    private Collection<Point> point;

    public MainPoints() {}

    public MainPoints(Long id) {
        this.id = id;
    }

    public MainPoints(Long id, Collection<Point> point) {
        this.id = id;
        this.point = point;
    }

    public Collection<Point> getPoint() {
        return point;
    }

    public void setPoint(Collection<Point> point) {
        this.point = point;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
