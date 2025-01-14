package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.SessionManager;

public interface SessionManagerRepository extends JpaRepository<SessionManager, Long> {
}