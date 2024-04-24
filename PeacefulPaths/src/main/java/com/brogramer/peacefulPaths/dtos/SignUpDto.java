package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDto {

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    private int experience;

    private String number;

    private Gender gender;

    private Location location;

    private ArrayList<Language> language;

    private University university;

    private Questionnaire questionnaire;

    public ArrayList<Language> getLanguage() {
        return language;
    }

    public Location getLocation() {
        return location;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public University getUniversity() {
        return university;
    }

    public Gender getGender() {
        return gender;
    }

    public String getPassword() {
        return password;
    }

    public String getLogin() {
        return email;
    }

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public int getExperience() {
        return experience;
    }

    public String getNumber() {
        return number;
    }
}
