package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionnaireDto {

    private Long id;

    private TherapyType therapyType;

    private int age;

    private IdentityType identityType;

    private RelationshipStatus relationshipStatus;

    private TherapyHistory therapyHistory;

    private MedicationHistory medicationHistory;

    private Communication communication;

    private Gender therapistGender;

    private TherapistType therapistType;

    private PhysicalHealth physicalHealth;

    private MentalState1 mentalState1;

    private MentalState2 mentalState2;

    private Collection<Language> language;

    private Location location;

    private Gender gender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Gender getTherapistGender() {
        return therapistGender;
    }

    public void setTherapistGender(Gender therapistGender) {
        this.therapistGender = therapistGender;
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

    public TherapyType getTherapyType() {
        return therapyType;
    }

    public void setTherapyType(TherapyType therapyType) {
        this.therapyType = therapyType;
    }

    public IdentityType getIdentityType() {
        return identityType;
    }

    public void setIdentityType(IdentityType identityType) {
        this.identityType = identityType;
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

    public TherapistType getTherapistType() {
        return therapistType;
    }

    public void setTherapistType(TherapistType therapistType) {
        this.therapistType = therapistType;
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
