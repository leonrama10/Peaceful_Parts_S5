package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_connections")
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "connected_user_id")
    private int therapistId;

    public Connection() {}

    public Connection(int id, int userId, int therapistId) {
        this.id = id;
        this.userId = userId;
        this.therapistId = therapistId;
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
// Constructors, getters, setters, and other methods

    // Additional fields or methods specific to the Connection entity can be added here
}