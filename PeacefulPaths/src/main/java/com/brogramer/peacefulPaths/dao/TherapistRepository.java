package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Gender;
import com.brogramer.peacefulPaths.entity.Roles;
import com.brogramer.peacefulPaths.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface TherapistRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRolesIn(Collection<Roles> roles);

    @Modifying
    @Query(value = "INSERT INTO user_connections (user_id, connected_user_id) VALUES (:userId, :connectedUserId)", nativeQuery = true)
    void addConnection(@Param("userId") int userId, @Param("connectedUserId") int connectedUserId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user_connections_history (user_id, connected_user_id) VALUES (:userId, :connectedUserId)", nativeQuery = true)
    void addConnectionHistory(@Param("userId") int userId, @Param("connectedUserId") int connectedUserId);

    @Query("SELECT uc.therapistId FROM Connection uc WHERE uc.userId = :userId")
    Integer findTherapistIdByUserId(@Param("userId") int userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Connection u WHERE u.userId = :userId")
    void deleteConnection(@Param("userId") int userId);

    @Query("SELECT uc.userId FROM Connection uc WHERE uc.userId = :userId")
    Integer findUserConnectionById(@Param("userId") int userId);

    @Query(value = "SELECT uc.user_id FROM user_connections uc WHERE uc.connected_user_id = :id", nativeQuery = true)
    Collection<Integer> findAllUsersConnectedById(@Param("id") int id);

    @Query(value = "SELECT uc.user_id FROM user_connections_history uc WHERE uc.connected_user_id = :id", nativeQuery = true)
    Collection<Integer> findAllUsersConnectedHistoryById(int id);

}
