package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "therapy_type")
public class TherapyType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "therapy_type")
    private String therapyType;

    public TherapyType() {}

    public TherapyType(Long id) {
        this.id = id;
    }

    public TherapyType(Long id, String therapyType) {
        this.id = id;
        this.therapyType = therapyType;
    }

    public String getTherapyType() {
        return therapyType;
    }

    public void setTherapyType(String therapyType) {
        this.therapyType = therapyType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
