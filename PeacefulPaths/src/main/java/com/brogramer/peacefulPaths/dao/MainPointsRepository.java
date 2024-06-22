package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.MainPoints;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MainPointsRepository extends JpaRepository<MainPoints,Integer> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM main_points WHERE id = :id", nativeQuery = true)
    void deleteBySpecificId(@Param("id") int id);
}
