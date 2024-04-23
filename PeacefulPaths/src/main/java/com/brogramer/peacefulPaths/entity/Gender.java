package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gender")
public class Gender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gender")
    private String gender;

    public Gender() {}

    public Gender(Long id) {
        this.id = id;
    }

    public Gender(Long id, String gender) {
        this.id = id;
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
