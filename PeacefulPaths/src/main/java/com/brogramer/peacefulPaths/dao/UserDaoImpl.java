package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Therapist;
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
	public Therapist findByEmailDAO(String theEmail) {

		// retrieve/read from database using email
		TypedQuery<Therapist> theQuery = entityManager.createQuery("from Therapist where email=:email", Therapist.class);
		theQuery.setParameter("email", theEmail);

		Therapist theUser;
		try {
			theUser = theQuery.getSingleResult();
		} catch (Exception e) {
			theUser = null;
		}

		return theUser;
	}

}
