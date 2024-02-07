package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TherapistRepository extends JpaRepository<Therapist,Integer> {
    Optional<Therapist> findByEmail(String email);
}
