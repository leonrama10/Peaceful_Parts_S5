package com.TrajnimePerTerapistet;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TerapistetNeTrajnimRepository extends JpaRepository<TerapistetNeTrajnim, Long> {
    List<TerapistetNeTrajnim> findByTerapistetId(Long terapistiID);
}
