package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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

    @Pattern(regexp = "^\\d{7,14}$", message = "Invalid Phone Number!")
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

    @Temporal(TemporalType.DATE)
    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "expiration_time")
    private Long expirationTime;

    @DateTimeFormat(pattern = "yyyy,MM,dd,HH,mm,ss")
    @Column(name = "date_added", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateAdded;

//    @Column(name = "token")
    @Transient
    private String token;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Roles> roles;

    @ManyToOne
    @JoinColumn(name = "questionnaire_id")
    private Questionnaire questionnaire;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "user_language",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id"))
    private Collection<Language> language;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

    @ManyToOne
    @JoinColumn(name = "therapist_info_id")
    private TherapistInfo therapistInfo;


    @Transient
    private List<Roles> allRoles = new ArrayList<>();

    public static final Roles ROLE_USER = new Roles(1,"ROLE_USER");
    public static final Roles ROLE_THERAPIST = new Roles(2,"ROLE_THERAPIST");
    public static final Roles ROLE_MANAGER = new Roles(3,"ROLE_ADMIN");

    public User() {}

    public User(int id, String name, String surname, String email, String number, int experience, String password, String confirmPassword, String resetToken, Date dateOfBirth, Long expirationTime, LocalDateTime dateAdded, String token, Collection<Roles> roles, Questionnaire questionnaire, Collection<Language> language, Location location, Gender gender, University university, TherapistInfo therapistInfo, List<Roles> allRoles) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.number = number;
        this.experience = experience;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.resetToken = resetToken;
        this.dateOfBirth = dateOfBirth;
        this.expirationTime = expirationTime;
        this.dateAdded = dateAdded;
        this.token = token;
        this.roles = roles;
        this.questionnaire = questionnaire;
        this.language = language;
        this.location = location;
        this.gender = gender;
        this.university = university;
        this.therapistInfo = therapistInfo;
        this.allRoles = allRoles;
    }

    public List<Roles> getAllRoles() {
        allRoles.add(ROLE_USER);
        allRoles.add(ROLE_THERAPIST);
        allRoles.add(ROLE_MANAGER);
        return allRoles;
    }

    public TherapistInfo getTherapistInfo() {
        return therapistInfo;
    }

    public void setTherapistInfo(TherapistInfo therapistInfo) {
        this.therapistInfo = therapistInfo;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

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
