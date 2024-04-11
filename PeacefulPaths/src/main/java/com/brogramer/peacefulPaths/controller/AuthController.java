package com.brogramer.peacefulPaths.controller;

import com.brogramer.peacefulPaths.config.UserAuthenticationProvider;
import com.brogramer.peacefulPaths.dtos.CredentialsDto;
import com.brogramer.peacefulPaths.dtos.SignUpDto;
import com.brogramer.peacefulPaths.dtos.UpdateDto;
import com.brogramer.peacefulPaths.dtos.UserDto;
import com.brogramer.peacefulPaths.entity.CustomUserDetails;
import com.brogramer.peacefulPaths.entity.User;
import com.brogramer.peacefulPaths.responses.UserInfo;
import com.brogramer.peacefulPaths.service.TherapistService;
import com.brogramer.peacefulPaths.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final TherapistService therapistService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public AuthController(UserService userService, UserAuthenticationProvider userAuthenticationProvider, TherapistService therapistService) {
        this.userService = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.therapistService = therapistService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getEmail()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getEmail()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @PutMapping("/auth/update")
    public ResponseEntity<UserDto> update(@RequestBody @Valid UserDto user) {
        UserDto createdUser = userService.update(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getEmail()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }
    @DeleteMapping("/auth/deleteUser/{id}")
    public void delete(@PathVariable int id) {
        userService.delete(id);
    }
    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal principal){
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(principal.getName());

        UserInfo userInfo = new UserInfo();
        userInfo.setId(userDetails.getId());
        userInfo.setEmail(userDetails.getUsername());
        userInfo.setName(userDetails.getName());
        userInfo.setSurname(userDetails.getSurname());
        userInfo.setRoles(userDetails.getRoles());
        userInfo.setPassword(userDetails.getPassword());
        userInfo.setNumber(userDetails.getNumber());
        userInfo.setLocation(userDetails.getLocation());
        userInfo.setExperience(userDetails.getExperience());
        userInfo.setResetToken(userDetails.getResetToken());
        userInfo.setExpirationTime(userDetails.getExpirationTime());

        return ResponseEntity.ok(userInfo);
    }
    @GetMapping("/auth/allUserinfo")
    public ResponseEntity<?> getAllUserInfo(){
        List<UserInfo> userInfos = therapistService.findAllByRole("ROLE_USER").stream().map(userDetails -> {
            UserInfo userInfo = new UserInfo();
            userInfo.setId(userDetails.getId());
            userInfo.setEmail(userDetails.getEmail());
            userInfo.setName(userDetails.getName());
            userInfo.setSurname(userDetails.getSurname());
            userInfo.setRoles(userDetails.getRoles());
            userInfo.setPassword(userDetails.getPassword());
            userInfo.setNumber(userDetails.getNumber());
            userInfo.setLocation(userDetails.getLocation());
            userInfo.setExperience(userDetails.getExperience());
            return userInfo;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @GetMapping("/auth/userinfoId/{id}")
    public ResponseEntity<?> getUserInfoId(@PathVariable int id){
        User userDetails = therapistService.findById(id);

        UserInfo userInfo = new UserInfo();

        userInfo.setId(userDetails.getId());
        userInfo.setEmail(userDetails.getEmail());
        userInfo.setName(userDetails.getName());
        userInfo.setSurname(userDetails.getSurname());
        userInfo.setRoles(userDetails.getRoles());
        userInfo.setPassword(userDetails.getPassword());
        userInfo.setNumber(userDetails.getNumber());
        userInfo.setLocation(userDetails.getLocation());
        userInfo.setExperience(userDetails.getExperience());
        userInfo.setAllRoles(userDetails.getAllRoles());

        return ResponseEntity.ok(userInfo);
    }
    @GetMapping("/auth/allTherapistInfo")
    public ResponseEntity<?> getAllTherapistInfo(){
        List<UserInfo> therapistInfos = therapistService.findAllByRole("ROLE_THERAPIST").stream().map(therapistDetails -> {
            UserInfo therapistInfo = new UserInfo();
            therapistInfo.setId(therapistDetails.getId());
            therapistInfo.setEmail(therapistDetails.getEmail());
            therapistInfo.setName(therapistDetails.getName());
            therapistInfo.setSurname(therapistDetails.getSurname());
            therapistInfo.setRoles(therapistDetails.getRoles());
            therapistInfo.setPassword(therapistDetails.getPassword());
            therapistInfo.setNumber(therapistDetails.getNumber());
            therapistInfo.setLocation(therapistDetails.getLocation());
            therapistInfo.setExperience(therapistDetails.getExperience());
            return therapistInfo;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(therapistInfos);
    }




    @PostMapping ("/auth/sendEmail")
    public ResponseEntity<UserDto> sendEmail(@RequestBody @Valid CredentialsDto credentialsDto) throws MessagingException {
        UserDto user = userService.findByEmail(credentialsDto.getEmail());
        user.setToken(userAuthenticationProvider.createToken(user.getEmail()));
        userService.sendEmail(user);
        userService.update(user);
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }

    @PutMapping("/auth/resetPassword")
    public ResponseEntity<UserDto> resetPassword(@RequestBody @Valid UserDto user) {
        UserDto createdUser = userService.update(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser.getEmail()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

}
