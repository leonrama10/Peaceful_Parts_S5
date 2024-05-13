package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.TherapistWorkDays;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TherapistWorkDaysRepository extends JpaRepository<TherapistWorkDays,Integer> {
    TherapistWorkDays findByTherapistId(int therapistId);
}
