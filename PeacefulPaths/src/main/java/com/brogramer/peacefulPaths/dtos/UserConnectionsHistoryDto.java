package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Gender;
import com.brogramer.peacefulPaths.entity.Location;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class UserConnectionsHistoryDto {

    private int id;
    private String email;
    private String name;
    private String surname;
    private Location location;
    private Gender gender;
    private String number;
    private int therapistId;
    private int userId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateAdded;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime removeDate;

    public UserConnectionsHistoryDto() {}

    public UserConnectionsHistoryDto(int id, String email, String name, String surname, Location location, Gender gender, String number, int therapistId, LocalDateTime dateAdded,int userId) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.location = location;
        this.gender = gender;
        this.number = number;
        this.therapistId = therapistId;
        this.dateAdded = dateAdded;
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDateTime getRemoveDate() {
        return removeDate;
    }

    public void setRemoveDate(LocalDateTime removeDate) {
        this.removeDate = removeDate;
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

    public String getEmail() {
        return email;
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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
