package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Integer> {
}
