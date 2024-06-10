package com.brogramer.peacefulPaths.dtos;

public class AdviceDto {
    private Long userId;
    private String advice;
    private int therapist_id;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public int getTherapist_id() {
        return therapist_id;
    }

    public void setTherapist_id(int therapist_id) {
        this.therapist_id = therapist_id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }
}
