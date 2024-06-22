package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Notes;
import com.brogramer.peacefulPaths.entity.TherapistNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TherapistNotesRepository extends JpaRepository<TherapistNotes,Integer> {
    @Query("SELECT t.notes FROM TherapistNotes t WHERE t.clientId = :clientId AND t.therapistId = :therapistId")
    List<Notes> findNotesIdByClientIdAndTherapistId(@Param("clientId") int clientId, @Param("therapistId") int therapistId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO therapist_notes_history (notes_id, client_id,therapist_id) VALUES (:notesId, :clientId, :therapistId)", nativeQuery = true)
    void saveTherapistNotesHistory(@Param("notesId") Long notesId, @Param("clientId") Long clientId, @Param("therapistId") Long therapistId);

    @Query("SELECT t.id FROM TherapistNotes t WHERE t.notes.id = :notesId")
    int findByNotesId(@Param("notesId") int notesId);
}

