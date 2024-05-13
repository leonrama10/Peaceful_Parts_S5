package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Weekdays;
import com.brogramer.peacefulPaths.entity.Workhours;
import lombok.*;

import java.time.LocalDate;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TherapistWorkDaysDto {

    private int therapistId;
    private LocalDate date;
    private Collection<Weekdays> days;
    private Collection<Workhours> workhours;

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Collection<Weekdays> getDays() {
        return days;
    }

    public void setDays(Collection<Weekdays> days) {
        this.days = days;
    }

    public Collection<Workhours> getWorkhours() {
        return workhours;
    }

    public void setWorkhours(Collection<Workhours> workhours) {
        this.workhours = workhours;
    }
}
