package com.brogramer.peacefulPaths.responses;

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
    private String location;
    private Collection<Roles> roles;
    private List<Roles> allRoles;

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
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
}
