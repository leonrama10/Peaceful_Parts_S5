package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface BookingsRepository extends JpaRepository<Bookings,Integer> {

    @Query("SELECT b FROM Bookings b JOIN b.therapistWorkDays t WHERE b.date = :date AND t.therapistId = :therapistId")
    List<Bookings> fetchBookedHours(@Param("date") LocalDate date, @Param("therapistId") int therapistId);

    @Query("SELECT b FROM Bookings b JOIN b.therapistWorkDays t WHERE b.clientId = :clientId AND t.therapistId = :therapistId")
    Collection<Bookings> fetchBookingsClientIdAndTherapistId(@Param("clientId")int clientId, @Param("therapistId") int therapistId);

    @Query("SELECT b FROM Bookings b JOIN b.therapistWorkDays t WHERE b.clientId = :clientId AND t.therapistId = :therapistId ORDER BY b.date ASC, b.hour ASC")
    List<Bookings> fetchNextBookingByClientIdAndTherapistId(@Param("clientId") int clientId, @Param("therapistId") int therapistId);

}
