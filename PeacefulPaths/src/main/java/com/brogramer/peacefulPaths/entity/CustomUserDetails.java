package com.brogramer.peacefulPaths.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {
    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public String getName() {
        return user.getName();
    }

    public String getSurname() {
        return user.getSurname();
    }

    public int getId(){
        return user.getId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public String getNumber() {
        return user.getNumber();
    }

    public Collection<Roles> getRoles() {
        return user.getRoles();
    }

    public int getExperience() {
        return user.getExperience();
    }

    public String getResetToken() {
        return user.getResetToken();
    }

    public Long getExpirationTime() {
        return user.getExpirationTime();
    }

    public Questionnaire getQuestionnaire() {
        return user.getQuestionnaire();
    }

    public Gender getGender() {
        return user.getGender();
    }

    public Location getLocation() {
        return user.getLocation();
    }

    public Collection<Language> getLanguage() {
        return user.getLanguage();
    }

    public University getUniversity() {
        return user.getUniversity();
    }

    public TherapistInfo getTherapistInfo() {
        return user.getTherapistInfo();
    }

    public Date getDateOfBirth() {
        return user.getDateOfBirth();
    }

    public String getToken() {
        return user.getToken();
    }
}

