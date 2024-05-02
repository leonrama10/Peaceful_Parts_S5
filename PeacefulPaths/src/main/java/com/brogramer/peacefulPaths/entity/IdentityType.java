package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "identity_type")
public class IdentityType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "identity_type")
    private String identityType;

    public IdentityType() {}

    public IdentityType(Long id) {
        this.id = id;
    }

    public IdentityType(Long id, String identityType) {
        this.id = id;
        this.identityType = identityType;
    }

    public String getIdentityType() {
        return identityType;
    }

    public void setIdentityType(String identityType) {
        this.identityType = identityType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
