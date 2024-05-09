package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Notes;
import com.brogramer.peacefulPaths.entity.TherapistNotesHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TherapistNotesHistoryRepository extends JpaRepository<TherapistNotesHistory,Integer> {

    @Query("SELECT t.notes FROM TherapistNotesHistory t WHERE t.clientId = :clientId AND t.therapistId = :therapistId")
    List<Notes> findNotesHistoryIdByClientIdAndTherapistId(@Param("clientId") int clientId, @Param("therapistId") int therapistId);

}
