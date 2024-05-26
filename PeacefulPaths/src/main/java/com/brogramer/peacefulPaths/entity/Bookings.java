package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "client_id")
    private int clientId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "hour")
    private LocalTime hour;

    @ManyToOne
    @JoinColumn(name = "therapist_work_days_id")
    private TherapistWorkDays therapistWorkDays;

    public Bookings() {}

    public Bookings(int id) {
        this.id = id;
    }

    public Bookings(int id, int clientId, LocalDate date, LocalTime hour, TherapistWorkDays therapistWorkDays) {
        this.id = id;
        this.clientId = clientId;
        this.date = date;
        this.hour = hour;
        this.therapistWorkDays = therapistWorkDays;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getHour() {
        return hour;
    }

    public void setHour(LocalTime hour) {
        this.hour = hour;
    }

    public TherapistWorkDays getTherapistWorkDays() {
        return therapistWorkDays;
    }

    public void setTherapistWorkDays(TherapistWorkDays therapistWorkDays) {
        this.therapistWorkDays = therapistWorkDays;
    }
}
