package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Roles;

import java.util.Collection;

public interface RoleDao {

	Roles findRoleByName(String theRoleName);
	Collection<Roles> findRoleByNameCollection(String theRoleName);

}
