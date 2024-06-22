package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
public class Notes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "notes_text")
    private String notesText;

    @Column(name = "patient_mood_after")
    private int patientMoodAfter;

    @Column(name = "patient_mood_before")
    private int patientMoodBefore;

    @DateTimeFormat(pattern = "yyyy,MM,dd,HH,mm,ss")
    @Column(name = "date_added", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateAdded;

    @ManyToOne
    @JoinColumn(name = "main_points_id")
    private MainPoints mainPoints;

    public Notes() {}

    public Notes(int id) {
        this.id = id;
    }

    public Notes(int id, String notesText, int patientMoodAfter, int patientMoodBefore, LocalDateTime dateAdded, MainPoints mainPoints) {
        this.id = id;
        this.notesText = notesText;
        this.patientMoodAfter = patientMoodAfter;
        this.patientMoodBefore = patientMoodBefore;
        this.dateAdded = dateAdded;
        this.mainPoints = mainPoints;
    }

    public String getNotesText() {
        return notesText;
    }

    public void setNotesText(String notesText) {
        this.notesText = notesText;
    }

    public int getPatientMoodAfter() {
        return patientMoodAfter;
    }

    public void setPatientMoodAfter(int patientMoodAfter) {
        this.patientMoodAfter = patientMoodAfter;
    }

    public int getPatientMoodBefore() {
        return patientMoodBefore;
    }

    public void setPatientMoodBefore(int patientMoodBefore) {
        this.patientMoodBefore = patientMoodBefore;
    }

    public MainPoints getMainPoints() {
        return mainPoints;
    }

    public void setMainPoints(MainPoints mainPoints) {
        this.mainPoints = mainPoints;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
