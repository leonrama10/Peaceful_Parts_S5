package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "therapytype")
public class TherapyType {

    @Id
    @GeneratedValue(strategy = therapytype.IDENTITY)
    private Long id;

    @Column(name = "therapytype")
    private String therapytype;

    public TherapyType() {}

    public TherapyType(Long id) {
        this.id = id;
    }

    public TherapyType(Long id, String therapytype) {
        this.id = id;
        this.therapytype = therapytype;
    }

    public String getTherapyType() {
        return therapytype;
    }

    public void setGender(String therapytype) {
        this.therapytype = therapytype;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
