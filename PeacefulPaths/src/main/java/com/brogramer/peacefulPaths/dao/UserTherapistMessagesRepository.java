package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.UserTherapistMessages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserTherapistMessagesRepository extends JpaRepository<UserTherapistMessages,Integer> {
    Optional<UserTherapistMessages> findByUserIdAndTherapistId(int userId, int therapistId);
}
