package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "therapist")
public class Therapist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotBlank(message = "Invalid First Name!")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Invalid Last Name!")
    @Column(name = "surname")
    private String surname;

    @Pattern(regexp = "^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",message = "Invalid Email!")
    @Column(name = "email")
    private String email;

    @Pattern(regexp = "^0(44|43|45|49)\\d{6}$",message = "Invalid Phone Number!")
    @Column(name = "number")
    private String number;

    @Min(value= 0,message = "Must be greater than or equal to 0!")
    @Column(name = "experience")
    private int experience;

    @Size(min=8,message = "Must be greater than or equal to 8!")
    @Column(name = "password")
    private String password;

    @Transient
    private String confirmPassword;

    @Transient
    private String resetToken;

    @Transient
    private Long expirationTime;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "therapist_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Roles> roles;

    @Transient
    private List<Roles> allRoles = new ArrayList<>();

    public static final Roles ROLE_USER = new Roles(1,"ROLE_USER");
    public static final Roles ROLE_EMPLOYEE = new Roles(2,"ROLE_EMPLOYEE");
    public static final Roles ROLE_MANAGER = new Roles(3,"ROLE_MANAGER");

    public Therapist() {}

    public Therapist(String name, String surname, String email, String number, int experience,Collection<Roles> roles,List<Roles> allRoles) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.number = number;
        this.experience = experience;
        this.roles = roles;
        this.allRoles = allRoles;
    }

    public List<Roles> getAllRoles() {
        allRoles.add(ROLE_USER);
        allRoles.add(ROLE_EMPLOYEE);
        allRoles.add(ROLE_MANAGER);
        return allRoles;
    }

    public Collection<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Roles> roles) {
        this.roles = roles;
    }

    public int getId() {
        return id;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
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

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
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

    @Override
    public String toString() {
        return "Therapist{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", number='" + number + '\'' +
                ", experience=" + experience +
                ", roles=" + roles +
                '}';
    }
}
