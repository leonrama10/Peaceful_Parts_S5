package com.brogramer.peacefulPaths.responses;

import com.brogramer.peacefulPaths.entity.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Date;


public class UserInfo {

    private String email;
    private String token;
    private int id;
    private int experience;
    private String name;
    private String surname;
    private String password;
    private String number;
    private University university;
    private Location location;
    private Collection<Roles> roles;
    private List<Roles> allRoles;
    private String resetToken;
    private Long expirationTime;
    private Gender gender;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private Collection<Language> language;
    private Questionnaire questionnaire;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateAdded;
    private Collection<TherapyType> therapyTypeTherapist;
    private TherapyType therapyTypeUser;
    private Collection<TherapistType> therapistTypeTherapist;
    private TherapistType therapistTypeUser;
    private Collection<IdentityType> identityTypeTherapist;
    private IdentityType identityTypeUser;
    private Gender therapistGender;
    private TherapyHistory therapyHistory;
    private Communication communication;
    private MedicationHistory medicationHistory;
    private MentalState1 mentalState1;
    private MentalState2 mentalState2;
    private PhysicalHealth physicalHealth;
    private RelationshipStatus relationshipStatus;
    private TherapistInfo therapistInfo;

    public Gender getTherapistGender() {
        return therapistGender;
    }

    public void setTherapistGender(Gender therapistGender) {
        this.therapistGender = therapistGender;
    }

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }

    public Collection<Language> getLanguage() {
        return language;
    }

    public void setLanguage(Collection<Language> language) {
        this.language = language;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public List<Roles> getAllRoles() {
        return allRoles;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getPassword() {
        return password;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Collection<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Roles> roles) {
        this.roles = roles;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number=number;
    }

    public void setAllRoles(List<Roles> allRoles) {
        this.allRoles=allRoles;
    }

    public String getResetToken() {
        return resetToken;
    }

    public Long getExpirationTime() {
        return expirationTime;
    }

    public void setResetToken(String resetToken) {
        this.resetToken=resetToken;
    }

    public void setExpirationTime(Long expirationTime) {
        this.expirationTime=expirationTime;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender=gender;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public Collection<TherapyType> getTherapyTypeTherapist() {
        return therapyTypeTherapist;
    }

    public void setTherapyTypeTherapist(Collection<TherapyType> therapyTypeTherapist) {
        this.therapyTypeTherapist = therapyTypeTherapist;
    }

    public Collection<TherapistType> getTherapistTypeTherapist() {
        return therapistTypeTherapist;
    }

    public void setTherapistTypeTherapist(Collection<TherapistType> therapistTypeTherapist) {
        this.therapistTypeTherapist = therapistTypeTherapist;
    }

    public Collection<IdentityType> getIdentityTypeTherapist() {
        return identityTypeTherapist;
    }

    public void setIdentityTypeTherapist(Collection<IdentityType> identityTypeTherapist) {
        this.identityTypeTherapist = identityTypeTherapist;
    }

    public TherapyType getTherapyTypeUser() {
        return therapyTypeUser;
    }

    public void setTherapyTypeUser(TherapyType therapyTypeUser) {
        this.therapyTypeUser = therapyTypeUser;
    }

    public TherapistType getTherapistTypeUser() {
        return therapistTypeUser;
    }

    public void setTherapistTypeUser(TherapistType therapistTypeUser) {
        this.therapistTypeUser = therapistTypeUser;
    }

    public IdentityType getIdentityTypeUser() {
        return identityTypeUser;
    }

    public void setIdentityTypeUser(IdentityType identityTypeUser) {
        this.identityTypeUser = identityTypeUser;
    }



    public TherapyHistory getTherapyHistory() {
        return therapyHistory;
    }

    public void setTherapyHistory(TherapyHistory therapyHistory) {
        this.therapyHistory = therapyHistory;
    }

    public Communication getCommunication() {
        return communication;
    }

    public void setCommunication(Communication communication) {
        this.communication = communication;
    }

    public MedicationHistory getMedicationHistory() {
        return medicationHistory;
    }

    public void setMedicationHistory(MedicationHistory medicationHistory) {
        this.medicationHistory = medicationHistory;
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

    public PhysicalHealth getPhysicalHealth() {
        return physicalHealth;
    }

    public void setPhysicalHealth(PhysicalHealth physicalHealth) {
        this.physicalHealth = physicalHealth;
    }

    public RelationshipStatus getRelationshipStatus() {
        return relationshipStatus;
    }

    public void setRelationshipStatus(RelationshipStatus relationshipStatus) {
        this.relationshipStatus = relationshipStatus;
    }

    public TherapistInfo getTherapistInfo() {
        return therapistInfo;
    }

    public void setTherapistInfo(TherapistInfo therapistInfo) {
        this.therapistInfo = therapistInfo;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
