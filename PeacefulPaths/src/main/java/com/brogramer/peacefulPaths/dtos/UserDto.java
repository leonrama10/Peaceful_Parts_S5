package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Collection<Language> language;
    private int id;
    private String name;
    private String surname;
    private String email;
    private String token;
    private String password;
    private String number;
    private Location location;
    private int experience;
    private Gender therapistGender;
    private TherapyType therapyTypeUser;
    private Collection<TherapyType> therapyTypeTherapist;
    private TherapyHistory therapyHistory;
    private IdentityType identityTypeUser;
    private Collection<IdentityType> identityTypeTherapist;
    private Collection<TherapistType> therapistTypeTherapist;
    private TherapistType therapistTypeUser;
    private Communication communication;
    private MedicationHistory medicationHistory;
    private MentalState1 mentalState1;
    private MentalState2 mentalState2;
    private PhysicalHealth physicalHealth;
    private RelationshipStatus relationshipStatus;
    private University university;
    private Collection<Roles> roles;
    private String resetToken;
    private Long expirationTime;
    private Gender gender;
    private Questionnaire questionnaire;
    private Date dateOfBirth;
    private TherapistInfo therapistInfo;

    public University getUniversity() {
        return university;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setUniversity(University university) {
        this.university = university;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Collection<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Roles> roles) {
        this.roles = roles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setLogin(String login) {
        this.email = login;
    }

   @Override
   public String toString(){
        return email;
   }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setExperience(int experience) {
        this.experience=experience;
    }
    public int getExperience() {
        return experience;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public Long getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Gender getTherapistGender() {
        return therapistGender;
    }

    public void setTherapistGender(Gender therapistGender) {
        this.therapistGender = therapistGender;
    }

    public TherapyType getTherapyTypeUser() {
        return therapyTypeUser;
    }

    public void setTherapyTypeUser(TherapyType therapyTypeUser) {
        this.therapyTypeUser = therapyTypeUser;
    }

    public Collection<TherapyType> getTherapyTypeTherapist() {
        return therapyTypeTherapist;
    }

    public void setTherapyTypeTherapist(Collection<TherapyType> therapyTypeTherapist) {
        this.therapyTypeTherapist = therapyTypeTherapist;
    }

    public TherapyHistory getTherapyHistory() {
        return therapyHistory;
    }

    public void setTherapyHistory(TherapyHistory therapyHistory) {
        this.therapyHistory = therapyHistory;
    }

    public IdentityType getIdentityTypeUser() {
        return identityTypeUser;
    }

    public void setIdentityTypeUser(IdentityType identityTypeUser) {
        this.identityTypeUser = identityTypeUser;
    }

    public Collection<IdentityType> getIdentityTypeTherapist() {
        return identityTypeTherapist;
    }

    public void setIdentityTypeTherapist(Collection<IdentityType> identityTypeTherapist) {
        this.identityTypeTherapist = identityTypeTherapist;
    }

    public Collection<TherapistType> getTherapistTypeTherapist() {
        return therapistTypeTherapist;
    }

    public void setTherapistTypeTherapist(Collection<TherapistType> therapistTypeTherapist) {
        this.therapistTypeTherapist = therapistTypeTherapist;
    }

    public TherapistType getTherapistTypeUser() {
        return therapistTypeUser;
    }

    public void setTherapistTypeUser(TherapistType therapistTypeUser) {
        this.therapistTypeUser = therapistTypeUser;
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
}
