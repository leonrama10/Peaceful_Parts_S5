package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "therapist_notes_history")
public class TherapistNotesHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "notes_id")
    private Notes notes;

    @Column(name = "client_id")
    private int clientId;

    @Column(name = "therapist_id")
    private int therapistId;

    @DateTimeFormat(pattern = "yyyy,MM,dd,HH,mm,ss")
    @Column(name = "date_added", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateAdded;

    public TherapistNotesHistory() {}

    public TherapistNotesHistory(int id) {
        this.id = id;
    }

    public TherapistNotesHistory(int id, Notes notes, int clientId, int therapistId, LocalDateTime dateAdded) {
        this.id = id;
        this.notes = notes;
        this.clientId = clientId;
        this.therapistId = therapistId;
        this.dateAdded = dateAdded;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Notes getNotes() {
        return notes;
    }

    public void setNotes(Notes notes) {
        this.notes = notes;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }
}
