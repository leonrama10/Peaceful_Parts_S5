package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.User;

public interface UserDao {

    User findByEmailDAO(String theEmail);
    
}
