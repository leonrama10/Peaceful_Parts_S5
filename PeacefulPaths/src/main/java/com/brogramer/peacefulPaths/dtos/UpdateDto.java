package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Roles;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateDto {

    private int id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String number;

    @NotEmpty
    private Collection<Roles> roles;

    public String getNumber() {
        return number;
    }

    public int getId() {
        return id;
    }

    public String getPassword() {
        return password;
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

    public String getLogin() {
        return email;
    }

    public Collection<Roles> getRoles() {
        return roles;
    }
}
