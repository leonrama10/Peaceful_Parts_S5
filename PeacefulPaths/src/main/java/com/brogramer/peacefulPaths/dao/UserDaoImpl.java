package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {

	private EntityManager entityManager;

	public UserDaoImpl(EntityManager theEntityManager) {
		this.entityManager = theEntityManager;
	}

	@Override
	public User findByEmailDAO(String theEmail) {

		// retrieve/read from database using email
		TypedQuery<User> theQuery = entityManager.createQuery("from User where email=:email", User.class);
		theQuery.setParameter("email", theEmail);

		User theUser;
		try {
			theUser = theQuery.getSingleResult();
		} catch (Exception e) {
			theUser = null;
		}

		return theUser;
	}



}
