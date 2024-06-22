package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.BookingsHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface BookingsHistoryRepository extends JpaRepository<BookingsHistory,Integer> {

    @Query("SELECT b FROM BookingsHistory b JOIN b.therapistWorkDays t WHERE b.clientId = :clientId")
    Collection<BookingsHistory> fetchBookingsHistoryByClientId(@Param("clientId") int clientId);

    @Query("SELECT b FROM BookingsHistory b JOIN b.therapistWorkDays t WHERE t.therapistId = :therapistId")
    Collection<BookingsHistory> fetchBookingsHistoryByTherapistId(@Param("therapistId") int therapistId);
}
