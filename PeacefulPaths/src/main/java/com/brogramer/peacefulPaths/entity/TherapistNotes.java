package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "therapist_notes")
public class TherapistNotes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public TherapistNotes() {}

    public TherapistNotes(Long id) {
        this.id = id;
    }

    public TherapistNotes(Long id, Notes notes, int clientId, int therapistId, LocalDateTime dateAdded) {
        this.id = id;
        this.notes = notes;
        this.clientId = clientId;
        this.therapistId = therapistId;
        this.dateAdded = dateAdded;
    }

}
