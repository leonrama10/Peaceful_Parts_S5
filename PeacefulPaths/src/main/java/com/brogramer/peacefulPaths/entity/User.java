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
@Table(name = "user")
public class User {

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


    @Column(name = "reset_token")
    private String resetToken;


    @Column(name = "expiration_time")
    private Long expirationTime;

    @Transient
    @Column(name = "token")
    private String token;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Roles> roles;

    @ManyToOne
    @JoinColumn(name = "questionnaire_id")
    private Questionnaire questionnaire;

    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

    @Transient
    private List<Roles> allRoles = new ArrayList<>();

    public static final Roles ROLE_USER = new Roles(1,"ROLE_USER");
    public static final Roles ROLE_THERAPIST = new Roles(2,"ROLE_THERAPIST");
    public static final Roles ROLE_MANAGER = new Roles(3,"ROLE_ADMIN");

    public User() {}

    public User(String name, String surname, String email, String number, int experience,Collection<Roles> roles,List<Roles> allRoles) {
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
        allRoles.add(ROLE_THERAPIST);
        allRoles.add(ROLE_MANAGER);
        return allRoles;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
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

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public String getLogin() {
        return email;
    }

    public void setLogin(String login) {
        this.email = login;
    }

    @Override
    public String toString() {
        return "User{" +
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
