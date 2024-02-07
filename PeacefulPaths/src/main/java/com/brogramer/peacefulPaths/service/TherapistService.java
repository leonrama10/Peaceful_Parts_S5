package com.brogramer.peacefulPaths.service;

import com.brogramer.peacefulPaths.entity.Therapist;
import jakarta.mail.MessagingException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface TherapistService extends UserDetailsService {

    List<Therapist> findAll();

    Therapist findById(int id);

    void save(Therapist therapist);

    void deleteById(int id);

    Therapist findByEmailAndPassword(String email, String password);

    Optional<Therapist> findByEmail(String email);

//    public void sendVerificationCode(String to, String code);

    void sendEmail(Therapist therapist) throws MessagingException;

//    void sendEmailError(String email) throws MessagingException;
    List<String> findByRole(String email) throws Exception;

    Therapist findByEmailDAO(String email);
}
