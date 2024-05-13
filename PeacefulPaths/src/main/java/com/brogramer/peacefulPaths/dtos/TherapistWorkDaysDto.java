package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Weekdays;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TherapistWorkDaysDto {

    private int therapistId;
    private Collection<Weekdays> days;
    private LocalTime startTime;
    private LocalTime endTime;

    public TherapistWorkDaysDto(int therapistId, Collection<Weekdays> days, LocalTime startTime, LocalTime endTime) {
        this.therapistId = therapistId;
        this.days = days;
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
}
