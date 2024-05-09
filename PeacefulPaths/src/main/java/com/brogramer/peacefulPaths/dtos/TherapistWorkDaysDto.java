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

}
