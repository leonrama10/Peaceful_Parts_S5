package com.brogramer.peacefulPaths.service;

import com.brogramer.peacefulPaths.dao.RoleRepository;
import com.brogramer.peacefulPaths.entity.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService{

    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Roles findById(int id) {
        Optional<Roles> roles = roleRepository.findById(id);

        Roles role = null;

        if (roles.isPresent()){
            role=roles.get();
        }

        return role;
    }
}
