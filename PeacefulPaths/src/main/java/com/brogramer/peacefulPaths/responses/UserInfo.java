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
    private Collection<TherapyType> therapyType;
    private TherapyType therapyTypeUser;
    private Collection<TherapistType> therapistType;
    private TherapistType therapistTypeUser;
    private Collection<IdentityType> identityType;
    private IdentityType identityTypeUser;
    private Gender therapistGender;

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

    public Collection<TherapyType> getTherapyType() {
        return therapyType;
    }

    public void setTherapyType(Collection<TherapyType> therapyType) {
        this.therapyType = therapyType;
    }

    public Collection<TherapistType> getTherapistType() {
        return therapistType;
    }

    public void setTherapistType(Collection<TherapistType> therapistType) {
        this.therapistType = therapistType;
    }

    public Collection<IdentityType> getIdentityType() {
        return identityType;
    }

    public void setIdentityType(Collection<IdentityType> identityType) {
        this.identityType = identityType;
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

    public Gender getTherapistGender() {
        return therapistGender;
    }

    public void setTherapistGender(Gender therapistGender) {
        this.therapistGender = therapistGender;
    }
}
