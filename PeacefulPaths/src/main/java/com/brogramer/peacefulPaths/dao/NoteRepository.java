package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Notes,Integer> {
}
