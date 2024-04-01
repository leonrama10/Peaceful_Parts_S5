package com.brogramer.peacefulPaths.service;

import com.brogramer.peacefulPaths.dao.RoleDao;
import com.brogramer.peacefulPaths.dao.TherapistRepository;
import com.brogramer.peacefulPaths.dtos.CredentialsDto;
import com.brogramer.peacefulPaths.dtos.SignUpDto;
import com.brogramer.peacefulPaths.dtos.UpdateDto;
import com.brogramer.peacefulPaths.dtos.UserDto;
import com.brogramer.peacefulPaths.entity.Roles;
import com.brogramer.peacefulPaths.entity.User;
import com.brogramer.peacefulPaths.exceptions.AppException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
public class UserService {

    private final TherapistRepository userRepository;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;


    public UserService(TherapistRepository userRepository, PasswordEncoder passwordEncoder,RoleDao roleDao) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleDao = roleDao;
    }

    //fix this
    public UserDto login(CredentialsDto credentialsDto) {
        Optional<User> user1 = userRepository.findByEmail(credentialsDto.getEmail());

        User user = user1.get();

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            UserDto userDto = new UserDto();

            userDto.setEmail( user.getEmail() );
            userDto.setId( user.getId() );
            userDto.setName( user.getName() );
            userDto.setSurname( user.getSurname() );
            userDto.setRoles( user.getRoles() );
            userDto.setPassword( user.getPassword() );

            return userDto;
        }else {
            throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
        }
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User();

        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        user.setConfirmPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getConfirmPassword())));
        Collection<Roles> collection = new ArrayList<>();
        collection.add(roleDao.findRoleByName("ROLE_USER"));
        user.setRoles(collection);

        User savedUser = userRepository.save(user);

        UserDto userDto1 = new UserDto();

        userDto1.setEmail( savedUser.getEmail() );
        userDto1.setId( savedUser.getId() );
        userDto1.setName( savedUser.getName() );
        userDto1.setSurname( savedUser.getSurname() );
        userDto1.setNumber(savedUser.getNumber());
        userDto1.setToken(savedUser.getToken());
        userDto1.setRoles(savedUser.getRoles());
        userDto1.setPassword(savedUser.getPassword());

        return userDto1;
    }

    public UserDto update(UpdateDto userDto) {
        Optional<User> emailUser = userRepository.findByEmail(userDto.getEmail());

        User user = new User();

        if (emailUser.isPresent()){
            if (emailUser.get().getId()==userDto.getId()) {
                user.setId(userDto.getId());
                user.setEmail(userDto.getEmail());
                user.setName(userDto.getName());
                user.setSurname(userDto.getSurname());
                user.setPassword(userDto.getPassword());
                user.setNumber(userDto.getNumber());
                user.setRoles(userDto.getRoles());
                user.setLocation(userDto.getLocation());
                user.setExperience(userDto.getExperience());
            }
            else {
                throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
            }
        }else {
            user.setId(userDto.getId());
            user.setEmail(userDto.getEmail());
            user.setName(userDto.getName());
            user.setSurname(userDto.getSurname());
            user.setPassword(userDto.getPassword());
            user.setNumber(userDto.getNumber());
            user.setRoles(userDto.getRoles());
            user.setLocation(userDto.getLocation());
            user.setExperience(userDto.getExperience());
        }

        User savedUser = userRepository.save(user);

        UserDto userDto1 = new UserDto();

        userDto1.setEmail( savedUser.getEmail() );
        userDto1.setId( savedUser.getId() );
        userDto1.setName( savedUser.getName() );
        userDto1.setSurname( savedUser.getSurname() );
        userDto1.setNumber(savedUser.getNumber());
        userDto1.setToken(savedUser.getToken());
        userDto1.setRoles(savedUser.getRoles());
        userDto1.setPassword(savedUser.getPassword());
        userDto1.setLocation(savedUser.getLocation());
        userDto1.setExperience(savedUser.getExperience());

        return userDto1;
    }



    public UserDto findByLogin(String login,String token) {
        Optional<User> user1 = userRepository.findByEmail(login);

        if (user1.isEmpty()){
            return null;
        }
        User user = user1.get();

        UserDto userDto = new UserDto();

        userDto.setEmail( user.getEmail() );
        userDto.setId( user.getId() );
        userDto.setName( user.getName() );
        userDto.setSurname( user.getSurname() );
        userDto.setNumber(user.getNumber());
        userDto.setToken(token);
        userDto.setRoles(user.getRoles());
        userDto.setPassword(user.getPassword());
        userDto.setLocation(user.getLocation());
        userDto.setExperience(user.getExperience());

        return userDto;
    }

    public void delete(int id) {
        User theUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        theUser.getRoles().clear();

        userRepository.deleteById(id);
    }
}
