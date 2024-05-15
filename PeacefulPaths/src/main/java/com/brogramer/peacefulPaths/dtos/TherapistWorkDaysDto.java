package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Weekdays;
import com.brogramer.peacefulPaths.entity.Workhours;
import lombok.*;

import java.time.LocalTime;
import java.util.Collection;

@Setter
@Getter
@Data
@Builder
public class TherapistWorkDaysDto {

    private int therapistId;
    private Collection<Weekdays> days;
    private Collection<Workhours> workhours;
    private LocalTime startTime;
    private LocalTime endTime;

    public TherapistWorkDaysDto(int therapistId, Collection<Weekdays> days, Collection<Workhours> workhours, LocalTime startTime, LocalTime endTime) {
        this.therapistId = therapistId;
        this.days = days;
        this.workhours = workhours;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public TherapistWorkDaysDto() {
    }

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public Collection<Weekdays> getDays() {
        return days;
    }

    public void setDays(Collection<Weekdays> days) {
        this.days = days;
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

    public Collection<Workhours> getWorkhours() {
        return workhours;
    }

    public void setWorkhours(Collection<Workhours> workhours) {
        this.workhours = workhours;
    }
}
