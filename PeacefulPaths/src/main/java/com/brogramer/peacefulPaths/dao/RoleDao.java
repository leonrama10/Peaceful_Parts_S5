package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Roles;

public interface RoleDao {

	Roles findRoleByName(String theRoleName);

}
