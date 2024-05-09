package com.brogramer.peacefulPaths.entity;

import java.time.LocalTime;
import java.util.Collection;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "therapist_work_days")
public class TherapistWorkDays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "therapist_id")
    private int therapistId;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "therapist_work_days_weekdays",
            joinColumns = @JoinColumn(name = "therapist_work_days_id"),
            inverseJoinColumns = @JoinColumn(name = "weekdays_id"))
    private Collection<Weekdays> weekdays;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    public TherapistWorkDays() {}

    public TherapistWorkDays(Long id) {
        this.id = id;
    }

    public TherapistWorkDays(Long id, int therapistId, Collection<Weekdays> weekdays, LocalTime startTime, LocalTime endTime) {
        this.id = id;
        this.therapistId = therapistId;
        this.weekdays = weekdays;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
