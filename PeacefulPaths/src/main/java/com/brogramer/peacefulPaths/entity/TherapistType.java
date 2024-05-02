package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "therapist_type")
public class TherapistType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "therapist_type")
    private String therapistType;

    public TherapistType() {}

    public TherapistType(Long id) {
        this.id = id;
    }

    public TherapistType(Long id, String therapistType) {
        this.id = id;
        this.therapistType = therapistType;
    }

    public String getTherapistType() {
        return therapistType;
    }

    public void setTherapistType(String therapistType) {
        this.therapistType = therapistType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}