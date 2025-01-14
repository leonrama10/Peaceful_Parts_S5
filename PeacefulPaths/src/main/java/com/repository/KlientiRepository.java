package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.Klienti;

public interface KlientiRepository extends JpaRepository<Klienti, Integer> {
}