package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Users;
import com.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users > getUserById(@PathVariable Integer id) {
        Users user = usersService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Users createUser (@RequestBody Users user) {
        return usersService.createUser (user);
    }
}