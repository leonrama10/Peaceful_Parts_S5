package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TherapistRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

}
