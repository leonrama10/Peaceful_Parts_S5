package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Gender;
import com.brogramer.peacefulPaths.entity.Language;
import com.brogramer.peacefulPaths.entity.Location;
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

    private String therapyType;

    private int age;

    private String identityType;

    private String relationshipStatus;

    private String therapyHistory;

    private String medicationHistory;

    private String communication;

    private Gender therapistGender;

    private String therapistType;

    private String currentPhysicalHealth;

    private String mentalState1;

    private String mentalState2;

    private Collection<Language> language;

    private Location location;

    private Gender gender;

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

    public String getIdentityType() {
        return identityType;
    }

    public void setIdentityType(String identityType) {
        this.identityType = identityType;
    }

    public String getTherapistType() {
        return therapistType;
    }

    public void setTherapistType(String therapistType) {
        this.therapistType = therapistType;
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

    public Gender getTherapistGender() {
        return therapistGender;
    }

    public void setTherapistGender(Gender therapistGender) {
        this.therapistGender = therapistGender;
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
