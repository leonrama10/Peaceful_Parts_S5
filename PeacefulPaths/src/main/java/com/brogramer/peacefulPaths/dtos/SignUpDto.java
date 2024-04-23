package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Questionnaire;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private Questionnaire questionnaire;


    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
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
}
