package com.brogramer.peacefulPaths.entity;

import java.util.Collection;

import jakarta.persistence.*;

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

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "therapist_work_days_workhours",
            joinColumns = @JoinColumn(name = "therapist_work_days_id"),
            inverseJoinColumns = @JoinColumn(name = "workhours_id"))
    private Collection<Workhours> workhours;

    public TherapistWorkDays() {}

    public TherapistWorkDays(Long id) {
        this.id = id;
    }

    public TherapistWorkDays(Long id, int therapistId, Collection<Weekdays> weekdays, Collection<Workhours> workhours) {
        this.id = id;
        this.therapistId = therapistId;
        this.weekdays = weekdays;
        this.workhours = workhours;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public Collection<Weekdays> getWeekdays() {
        return weekdays;
    }

    public void setWeekdays(Collection<Weekdays> weekdays) {
        this.weekdays = weekdays;
    }

    public Collection<Workhours> getWorkhours() {
        return workhours;
    }

    public void setWorkhours(Collection<Workhours> workhours) {
        this.workhours = workhours;
    }

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public Collection<Weekdays> getWeekdays() {
        return weekdays;
    }

    public void setWeekdays(Collection<Weekdays> weekdays) {
        this.weekdays = weekdays;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
