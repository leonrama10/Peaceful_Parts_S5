package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
}