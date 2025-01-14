package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.Terapisti;

public interface TerapistiRepository extends JpaRepository<Terapisti, Integer> {
}