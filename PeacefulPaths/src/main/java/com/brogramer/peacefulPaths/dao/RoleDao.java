package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Roles;

public interface RoleDao {

	public Roles findRoleByName(String theRoleName);
	
}
