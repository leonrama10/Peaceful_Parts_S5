package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "bookings_history")
public class BookingsHistory {

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

    @Column(name = "end_session_boolean")
    private boolean endSessionBoolean;

    @Column(name = "canceled")
    private boolean canceled;

    public BookingsHistory() {}

    public BookingsHistory(int id) {
        this.id = id;
    }

    public BookingsHistory(int id, int clientId, LocalDate date, LocalTime hour, TherapistWorkDays therapistWorkDays,boolean endSessionBoolean,boolean canceled) {
        this.id = id;
        this.clientId = clientId;
        this.date = date;
        this.hour = hour;
        this.therapistWorkDays = therapistWorkDays;
        this.endSessionBoolean = endSessionBoolean;
        this.canceled = canceled;
    }

    public boolean getCanceled() {
        return canceled;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
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

    public boolean getEndSessionBoolean() {
        return endSessionBoolean;
    }

    public void setEndSessionBoolean(boolean endSessionBoolean) {
        this.endSessionBoolean = endSessionBoolean;
    }
}
