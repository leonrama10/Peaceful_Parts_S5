package com.brogramer.peacefulPaths.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteDto {

    private int id;
    private int clientId;
    private int therapistId;
    private int patientMoodAfter;
    private int patientMoodBefore;
    private String notesText;
    private ArrayList<String> mainPoints;
    private int mainPointsId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateAdded;

    public int getMainPointsId() {
        return mainPointsId;
    }

    public void setMainPointsId(int mainPointsId) {
        this.mainPointsId = mainPointsId;
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

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
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

    public String getNotesText() {
        return notesText;
    }

    public void setNotesText(String notesText) {
        this.notesText = notesText;
    }

    public ArrayList<String> getMainPoints() {
        return mainPoints;
    }

    public void setMainPoints(ArrayList<String> mainPoints) {
        this.mainPoints = mainPoints;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }
}
