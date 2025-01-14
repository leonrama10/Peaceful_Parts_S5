package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}