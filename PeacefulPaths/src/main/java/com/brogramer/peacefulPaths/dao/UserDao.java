package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Therapist;

public interface UserDao {

    Therapist findByEmailDAO(String theEmail);
    
}
