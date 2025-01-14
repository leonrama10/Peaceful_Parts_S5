package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.Raportet;

public interface RaportetRepository extends JpaRepository<Raportet, Integer> {
}