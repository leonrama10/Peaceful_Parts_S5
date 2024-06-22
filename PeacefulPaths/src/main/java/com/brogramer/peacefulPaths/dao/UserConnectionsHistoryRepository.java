package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.UserConnectionsHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface UserConnectionsHistoryRepository  extends JpaRepository<UserConnectionsHistory,Integer> {

    @Query(value = "SELECT * FROM user_connections_history uc WHERE uc.connected_user_id = :id", nativeQuery = true)
    Collection<UserConnectionsHistory> findAllByConnectedUserId(int id);

    @Query(value = "SELECT * FROM user_connections_history uc WHERE uc.user_id = :id", nativeQuery = true)
    List<UserConnectionsHistory> findAllByUserId(int id);

    @Query(value = "SELECT * FROM user_connections_history uc WHERE uc.user_id = :userId AND uc.date_added= :date", nativeQuery = true)
    UserConnectionsHistory findByUserIdAndDateAdded(int userId, LocalDateTime date);
}
