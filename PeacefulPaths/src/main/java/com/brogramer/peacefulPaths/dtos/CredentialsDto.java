package com.brogramer.peacefulPaths.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CredentialsDto {

    private String email;
    private char[] password;

    public String getEmail() {
        return email;
    }

    public char[] getPassword() {
        return password;
    }
}
