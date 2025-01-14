package com.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class TherapistTools {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String therapistId;
    private LocalDateTime appointmentTime;

    public TherapistTools() {
    }

    public TherapistTools(String therapistId, LocalDateTime appointmentTime) {
        this.therapistId = therapistId;
        this.appointmentTime = appointmentTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(String therapistId) {
        this.therapistId = therapistId;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public void scheduleAppointment(String therapistId, LocalDateTime appointmentTime) {
        this.therapistId = therapistId;
        this.appointmentTime = appointmentTime;
        System.out.println("Scheduled appointment for therapist " + therapistId + " at " + appointmentTime);
    }
}