package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.ProgressTracker;

public interface ProgressTrackerRepository extends JpaRepository<ProgressTracker, Long> {
}