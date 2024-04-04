package com.brogramer.peacefulPaths.service;

import com.brogramer.peacefulPaths.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface TherapistService extends UserDetailsService {

    List<User> findAll();

    List<User> findAllByRole(String role);

    User findById(int id);

    void save(User therapist);

    void deleteById(int id);

    User findByEmailAndPassword(String email, String password);

    Optional<User> findByEmail(String email);

//    public void sendVerificationCode(String to, String code);

    void sendEmail(User therapist) throws MessagingException;

//    void sendEmailError(String email) throws MessagingException;
    List<String> findByRole(String email) throws Exception;

    User findByEmailDAO(String email);

    public UserDetails loadUserByUsername(String email);
}
