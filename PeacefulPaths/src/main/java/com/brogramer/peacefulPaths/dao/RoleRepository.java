package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Roles,Integer> {
}
