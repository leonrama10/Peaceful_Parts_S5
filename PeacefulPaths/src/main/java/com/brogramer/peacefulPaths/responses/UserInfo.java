package com.brogramer.peacefulPaths.responses;

import com.brogramer.peacefulPaths.entity.Gender;
import com.brogramer.peacefulPaths.entity.Location;
import com.brogramer.peacefulPaths.entity.Roles;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class UserInfo {
    private String email;
    private int id;
    private int experience;
    private String name;
    private String surname;
    private String password;
    private String number;
    private Location location;
    private Collection<Roles> roles;
    private List<Roles> allRoles;
    private String resetToken;
    private Long expirationTime;
    private Gender gender;

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

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender=gender;
    }
}
