package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table(name = "questionnaire")
public class Questionnaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "therapy_type_id")
    private TherapyType therapyType;

    @Column(name = "age")
    private int age;

    @ManyToOne
    @JoinColumn(name = "identity_type_id")
    private IdentityType identityType;

    @ManyToOne
    @JoinColumn(name = "relationship_status_id")
    private RelationshipStatus relationshipStatus;

    @ManyToOne
    @JoinColumn(name = "therapy_history_id")
    private TherapyHistory therapyHistory;

    @ManyToOne
    @JoinColumn(name = "medication_history_id")
    private MedicationHistory medicationHistory;

    @ManyToOne
    @JoinColumn(name = "communication_id")
    private Communication communication;

    @ManyToOne
    @JoinColumn(name = "therapist_gender")
    private Gender therapistGender;

    @ManyToOne
    @JoinColumn(name = "therapist_type_id")
    private TherapistType therapistType;

    @ManyToOne
    @JoinColumn(name = "physical_health_id")
    private PhysicalHealth physicalHealth;

    @ManyToOne
    @JoinColumn(name = "mental_state_1_id")
    private MentalState1 mentalState1;

    @ManyToOne
    @JoinColumn(name = "mental_state_2_id")
    private MentalState2 mentalState2;

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

    public Questionnaire() {
    }

    public Questionnaire(Long id) {
        this.id = id;
    }

    public Questionnaire(Long id, TherapyType therapyType, int age, IdentityType identityType, RelationshipStatus relationshipStatus, TherapyHistory therapyHistory, MedicationHistory medicationHistory, Communication communication, Gender therapistGender, TherapistType therapistType, PhysicalHealth physicalHealth, MentalState1 mentalState1, MentalState2 mentalState2, Location location, Gender gender, Collection<Language> language) {
        this.id = id;
        this.therapyType = therapyType;
        this.age = age;
        this.identityType = identityType;
        this.relationshipStatus = relationshipStatus;
        this.therapyHistory = therapyHistory;
        this.medicationHistory = medicationHistory;
        this.communication = communication;
        this.therapistGender = therapistGender;
        this.therapistType = therapistType;
        this.physicalHealth = physicalHealth;
        this.mentalState1 = mentalState1;
        this.mentalState2 = mentalState2;
        this.location = location;
        this.gender = gender;
        this.language = language;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TherapyType getTherapyType() {
        return therapyType;
    }

    public void setTherapyType(TherapyType therapyType) {
        this.therapyType = therapyType;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public IdentityType getIdentityType() {
        return identityType;
    }

    public void setIdentityType(IdentityType identityType) {
        this.identityType = identityType;
    }

    public Gender getTherapistGender() {
        return therapistGender;
    }

    public void setTherapistGender(Gender therapistGender) {
        this.therapistGender = therapistGender;
    }

    public TherapistType getTherapistType() {
        return therapistType;
    }

    public void setTherapistType(TherapistType therapistType) {
        this.therapistType = therapistType;
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

    public RelationshipStatus getRelationshipStatus() {
        return relationshipStatus;
    }

    public void setRelationshipStatus(RelationshipStatus relationshipStatus) {
        this.relationshipStatus = relationshipStatus;
    }

    public TherapyHistory getTherapyHistory() {
        return therapyHistory;
    }

    public void setTherapyHistory(TherapyHistory therapyHistory) {
        this.therapyHistory = therapyHistory;
    }

    public MedicationHistory getMedicationHistory() {
        return medicationHistory;
    }

    public void setMedicationHistory(MedicationHistory medicationHistory) {
        this.medicationHistory = medicationHistory;
    }

    public Communication getCommunication() {
        return communication;
    }

    public void setCommunication(Communication communication) {
        this.communication = communication;
    }

    public PhysicalHealth getPhysicalHealth() {
        return physicalHealth;
    }

    public void setPhysicalHealth(PhysicalHealth physicalHealth) {
        this.physicalHealth = physicalHealth;
    }

    public MentalState1 getMentalState1() {
        return mentalState1;
    }

    public void setMentalState1(MentalState1 mentalState1) {
        this.mentalState1 = mentalState1;
    }

    public MentalState2 getMentalState2() {
        return mentalState2;
    }

    public void setMentalState2(MentalState2 mentalState2) {
        this.mentalState2 = mentalState2;
    }
}

