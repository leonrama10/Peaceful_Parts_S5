package com.brogramer.peacefulPaths.dtos;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ErrorDto {

    private String message;

    public ErrorDto(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}