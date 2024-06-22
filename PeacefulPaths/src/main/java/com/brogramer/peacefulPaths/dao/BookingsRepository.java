package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

public interface BookingsRepository extends JpaRepository<Bookings,Integer> {

    @Query("SELECT b FROM Bookings b JOIN b.therapistWorkDays t WHERE b.date = :date AND t.therapistId = :therapistId")
    List<Bookings> fetchBookedHours(@Param("date") LocalDate date, @Param("therapistId") int therapistId);

    @Query("SELECT b FROM Bookings b JOIN b.therapistWorkDays t WHERE b.clientId = :clientId AND t.therapistId = :therapistId")
    Collection<Bookings> fetchBookingsClientIdAndTherapistId(@Param("clientId")int clientId, @Param("therapistId") int therapistId);

    @Query("SELECT b FROM Bookings b JOIN b.therapistWorkDays t WHERE b.clientId = :clientId AND t.therapistId = :therapistId ORDER BY b.date ASC, b.hour ASC")
    List<Bookings> fetchNextBookingByClientIdAndTherapistId(@Param("clientId") int clientId, @Param("therapistId") int therapistId);

    @Query("SELECT b FROM Bookings b JOIN b.therapistWorkDays t WHERE t.therapistId = :therapistId ORDER BY b.date ASC, b.hour ASC")
    List<Bookings> fetchNextBookingsByTherapistId(@Param("therapistId") int therapistId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO bookings_history (client_id, date,hour,end_session_boolean,therapist_work_days_id) VALUES (:clientId, :date, :hour, :endSessionBoolean, :therapistWorkDays)", nativeQuery = true)
    void saveHistory(@Param("clientId") int clientId, @Param("date") LocalDate date, @Param("hour") LocalTime hour, @Param("endSessionBoolean") boolean endSessionBoolean, @Param("therapistWorkDays") long therapistWorkDays);

}
