package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat,Integer> {
}
