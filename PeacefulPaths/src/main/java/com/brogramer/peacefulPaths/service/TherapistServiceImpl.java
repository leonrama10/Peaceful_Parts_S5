package com.brogramer.peacefulPaths.service;

import com.brogramer.peacefulPaths.dao.RoleDao;
import com.brogramer.peacefulPaths.dao.TherapistRepository;
import com.brogramer.peacefulPaths.dao.UserDao;
import com.brogramer.peacefulPaths.entity.Roles;
import com.brogramer.peacefulPaths.entity.Therapist;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.TypedQuery;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TherapistServiceImpl implements TherapistService{

    private TherapistRepository therapistRepository;

    private EntityManager entityManager;

    private UserDao userDao;

    private RoleDao roleDao;


    @Autowired
    public TherapistServiceImpl(TherapistRepository therapistRepository, EntityManager entityManager, UserDao userDao, RoleDao roleDao) {
        this.therapistRepository = therapistRepository;
        this.entityManager=entityManager;
        this.userDao = userDao;
        this.roleDao = roleDao;
    }

    @Override
    public List<Therapist> findAll() {
        return therapistRepository.findAll();
    }

    @Override
    public Therapist findById(int id) {
        Optional<Therapist> therapist = therapistRepository.findById(id);

        Therapist theTherapist = null;

        if (therapist.isPresent()){
            theTherapist=therapist.get();
        }

        return theTherapist;
    }

    @Override
    public void save(Therapist therapist) {
        Roles userRole = roleDao.findRoleByName("ROLE_USER");

        if (therapist.getRoles() == null) {
            therapist.setRoles(new ArrayList<>());
        }

        if (!therapist.getRoles().contains(userRole)) {
            therapist.getRoles().add(userRole);
        }

        therapistRepository.save(therapist);
    }

    @Override
    public void deleteById(int id) {
        Therapist therapist = therapistRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Therapist not found"));

        therapist.getRoles().clear();

        therapistRepository.deleteById(id);
    }

    @Override
    public Therapist findByEmailAndPassword(String email,String password) {

        Optional<Therapist> therapist = therapistRepository.findByEmail(email);

        Therapist theTherapist = null;
        if (therapist.isPresent()){
            boolean passwordmatch = BCrypt.checkpw(password, therapist.get().getPassword());
            if (passwordmatch){
                theTherapist=therapist.get();
            }
        }

        return theTherapist;
    }

    @Override
    public Optional<Therapist> findByEmail(String email) {

        return therapistRepository.findByEmail(email);
    }

    @Autowired
    private JavaMailSender javaMailSender;

//    @Override
//    public void sendVerificationCode(String to, String code) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("Verification Code");
//        message.setText("Your verification code is: " + code);
//        javaMailSender.send(message);
//    }

    @Override
    public void sendEmail(Therapist therapist) throws MessagingException {
        String token = UUID.randomUUID().toString();
        therapist.setResetToken(token);
        therapist.setExpirationTime(System.currentTimeMillis() + (10 * 60 * 1000));

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(therapist.getEmail());
        helper.setSubject("Forgotten password reset");

        String verificationLink = "<a href='http://localhost:8080/peacefulPaths/resetPassword?token=" + token + "'>Click here to reset your password.</a>";

        String emailContent = "<p>Hello,</p>" +
                "<p>" + verificationLink + "</p>" +
                "<p>If you didn't request this email or have any questions, please contact us at markaj.leka@gmail.com</p>" +
                "<p>Thanks,<br>PeacefulParts team</p>";

        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    @Override
    public List<String> findByRole(String email) throws Exception {

        try {
            TypedQuery<Roles> theQuery = entityManager.createQuery("SELECT roles FROM Therapist where email=:theData", Roles.class);

            theQuery.setParameter("theData",email);

            List<Roles> rolesList = theQuery.getResultList();

            if (rolesList.isEmpty()) {
                return Collections.singletonList("ROLE_USER");
            }

            return rolesList.stream().map(Roles::getRole).collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("WRONG ROLE!!! - findByRole");
        }
    }


//    @Override
//    public void sendEmailError(String email) throws MessagingException {
//        MimeMessage message = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//        helper.setTo(email);
//        helper.setSubject("Forgotten password reset");
//        String emailContent = "<p>Hello,</p>"+
//                "<p>You asked us to send password reset instructions to <strong>"+email+"</strong>. Unfortunately, there is no account on PeacefulParts for this email address.</p>"+
//                "<p>If you continue to have issues accessing your account, please contact us.</p>"+
//                "<p>Thanks,<br>PeacefulParts team</p>";
//
//        helper.setText(emailContent, true);
//
//        javaMailSender.send(message);
//    }



    @Override
    public Therapist findByEmailDAO(String email) {
        // check the database if the user already exists
        return userDao.findByEmailDAO(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Therapist user = userDao.findByEmailDAO(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid email or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Roles> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList());
    }

}
