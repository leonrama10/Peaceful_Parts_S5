package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Workhours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkhoursRepository extends JpaRepository<Workhours,Integer> {
}
