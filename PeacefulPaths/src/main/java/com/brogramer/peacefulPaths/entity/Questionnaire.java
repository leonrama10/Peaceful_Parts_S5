package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table(name = "questionnaire")
public class Questionnaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "therapy_type")
    private String therapyType;

    @Column(name = "age")
    private int age;

    @Column(name = "identity")
    private String identity;

    @Column(name = "relationship_status")
    private String relationshipStatus;

    @Column(name = "therapy_history")
    private String therapyHistory;

    @Column(name = "medication_history")
    private String medicationHistory;

    @Column(name = "communication")
    private String communication;

    @Column(name = "therapist_gender")
    private String therapistGender;

    @Column(name = "therapist_expectations")
    private String therapistExpectations;

    @Column(name = "current_physical_health")
    private String currentPhysicalHealth;

    @Column(name = "mental_state_1")
    private String mentalState1;

    @Column(name = "mental_state_2")
    private String mentalState2;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "questionnaire_language",
            joinColumns = @JoinColumn(name = "questionnaire_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id"))
    private Collection<Language> language;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTherapyType() {
        return therapyType;
    }

    public void setTherapyType(String therapyType) {
        this.therapyType = therapyType;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public String getRelationshipStatus() {
        return relationshipStatus;
    }

    public void setRelationshipStatus(String relationshipStatus) {
        this.relationshipStatus = relationshipStatus;
    }

    public String getTherapyHistory() {
        return therapyHistory;
    }

    public void setTherapyHistory(String therapyHistory) {
        this.therapyHistory = therapyHistory;
    }

    public String getMedicationHistory() {
        return medicationHistory;
    }

    public void setMedicationHistory(String medicationHistory) {
        this.medicationHistory = medicationHistory;
    }

    public String getCommunication() {
        return communication;
    }

    public void setCommunication(String communication) {
        this.communication = communication;
    }

    public String getTherapistGender() {
        return therapistGender;
    }

    public void setTherapistGender(String therapistGender) {
        this.therapistGender = therapistGender;
    }

    public String getTherapistExpectations() {
        return therapistExpectations;
    }

    public void setTherapistExpectations(String therapistExpectations) {
        this.therapistExpectations = therapistExpectations;
    }

    public String getCurrentPhysicalHealth() {
        return currentPhysicalHealth;
    }

    public void setCurrentPhysicalHealth(String currentPhysicalHealth) {
        this.currentPhysicalHealth = currentPhysicalHealth;
    }

    public String getMentalState1() {
        return mentalState1;
    }

    public void setMentalState1(String mentalState1) {
        this.mentalState1 = mentalState1;
    }

    public String getMentalState2() {
        return mentalState2;
    }

    public void setMentalState2(String mentalState2) {
        this.mentalState2 = mentalState2;
    }

    public Collection<Language> getLanguage() {
        return language;
    }

    public void setLanguage(Collection<Language> language) {
        this.language = language;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }


}

