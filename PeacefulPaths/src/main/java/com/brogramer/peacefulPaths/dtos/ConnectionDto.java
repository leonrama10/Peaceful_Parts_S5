package com.brogramer.peacefulPaths.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConnectionDto {
    private int userId;
    private int therapistId;

    public int getTherapistId() {
        return therapistId;
    }

    public int getUserId() {
        return userId;
    }
}
