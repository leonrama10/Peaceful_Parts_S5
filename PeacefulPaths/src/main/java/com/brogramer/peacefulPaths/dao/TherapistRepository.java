package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Roles;
import com.brogramer.peacefulPaths.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface TherapistRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRolesIn(Collection<Roles> roles);
}
