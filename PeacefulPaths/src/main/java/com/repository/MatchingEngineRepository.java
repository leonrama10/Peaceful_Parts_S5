package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.MatchingEngine;

public interface MatchingEngineRepository extends JpaRepository<MatchingEngine, Long> {
}
