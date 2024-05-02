package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table(name = "therapist_info")
public class TherapistInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "therapist_info_therapy_type",
            joinColumns = @JoinColumn(name = "therapist_info_id"),
            inverseJoinColumns = @JoinColumn(name = "therapy_type_id"))
    private Collection<TherapyType> therapyType;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "therapist_info_identity_type",
            joinColumns = @JoinColumn(name = "therapist_info_id"),
            inverseJoinColumns = @JoinColumn(name = "identity_type_id"))
    private Collection<IdentityType> identityType;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "therapist_info_therapist_type",
            joinColumns = @JoinColumn(name = "therapist_info_id"),
            inverseJoinColumns = @JoinColumn(name = "therapist_type_id"))
    private Collection<TherapistType> therapistType;


    public TherapistInfo() {}

    public TherapistInfo(Long id) {
        this.id = id;
    }

    public TherapistInfo(Long id, Collection<TherapyType> therapyType, Collection<IdentityType> identityType, Collection<TherapistType> therapistType) {
        this.id = id;
        this.therapyType = therapyType;
        this.identityType = identityType;
        this.therapistType = therapistType;
    }

    public Collection<TherapyType> getTherapyType() {
        return therapyType;
    }

    public void setTherapyType(Collection<TherapyType> therapyType) {
        this.therapyType = therapyType;
    }

    public Collection<IdentityType> getIdentityType() {
        return identityType;
    }

    public void setIdentityType(Collection<IdentityType> identityType) {
        this.identityType = identityType;
    }

    public Collection<TherapistType> getTherapistType() {
        return therapistType;
    }

    public void setTherapistType(Collection<TherapistType> therapistType) {
        this.therapistType = therapistType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}