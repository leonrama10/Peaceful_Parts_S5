package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_connections_history")
public class UserConnectionsHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "connected_user_id")
    private int therapistId;

    @DateTimeFormat(pattern = "yyyy,MM,dd,HH,mm,ss")
    @Column(name = "date_added", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateAdded;

    @DateTimeFormat(pattern = "yyyy,MM,dd,HH,mm,ss")
    @Column(name = "remove_date", columnDefinition="TIMESTAMP DEFAULT NULL")
    private LocalDateTime removeDate;

    public UserConnectionsHistory() {}

    public UserConnectionsHistory(int id, int userId, int therapistId) {
        this.id = id;
        this.userId = userId;
        this.therapistId = therapistId;
    }

    public LocalDateTime getRemoveDate() {
        return removeDate;
    }

    public void setRemoveDate(LocalDateTime removeDate) {
        this.removeDate = removeDate;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }
}
