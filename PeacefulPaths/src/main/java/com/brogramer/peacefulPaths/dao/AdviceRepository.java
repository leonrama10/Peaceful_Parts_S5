package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Advice;
import com.brogramer.peacefulPaths.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdviceRepository extends JpaRepository<Advice, Long> {
    List<Advice> findByUser(User user);


}