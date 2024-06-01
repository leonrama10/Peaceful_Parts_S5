package com.brogramer.peacefulPaths.dtos;

import jakarta.validation.constraints.NotNull;

public class FeedbackDto {

    @NotNull
    private Long userId;

    @NotNull
    private Long therapistId;

    @NotNull
    private String feedback;

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(Long therapistId) {
        this.therapistId = therapistId;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
