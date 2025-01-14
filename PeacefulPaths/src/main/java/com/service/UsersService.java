package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Users;
import com.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(Integer id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users createUser (Users user) {
        return usersRepository.save(user);
    }
}