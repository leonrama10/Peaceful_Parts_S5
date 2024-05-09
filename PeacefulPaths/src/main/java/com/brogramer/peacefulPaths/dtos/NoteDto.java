package com.brogramer.peacefulPaths.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteDto {

    private int clientId;
    private int therapistId;
    private int patientMoodAfter;
    private int patientMoodBefore;
    private String notesText;
    private Collection<String> mainPoints;

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

    public Collection<String> getMainPoints() {
        return mainPoints;
    }

    public void setMainPoints(Collection<String> mainPoints) {
        this.mainPoints = mainPoints;
    }
}
