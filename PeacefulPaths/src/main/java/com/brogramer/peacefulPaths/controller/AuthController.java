package com.brogramer.peacefulPaths.controller;

import com.brogramer.peacefulPaths.config.UserAuthenticationProvider;
import com.brogramer.peacefulPaths.dao.TherapistRepository;
import com.brogramer.peacefulPaths.dtos.*;
import com.brogramer.peacefulPaths.entity.Connection;
import com.brogramer.peacefulPaths.entity.CustomUserDetails;
import com.brogramer.peacefulPaths.entity.Roles;
import com.brogramer.peacefulPaths.entity.User;
import com.brogramer.peacefulPaths.responses.UserInfo;
import com.brogramer.peacefulPaths.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    private final TherapistRepository userRepository;
    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public AuthController(UserService userService, UserAuthenticationProvider userAuthenticationProvider,TherapistRepository userRepository) {
        this.userService = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.userRepository = userRepository;
    }

    public List<UserInfo> getAllWithRole(String role) {
        return userService.findAllByRole(role).stream().map(this::convertToUserInfo).collect(Collectors.toList());
    }

    public UserInfo convertToUserInfo(User userDetails) {

        Collection<Roles> role;
        Roles roleUser = new Roles(1,"ROLE_USER");

        UserInfo userInfo = new UserInfo();
        userInfo.setId(userDetails.getId());
        userInfo.setEmail(userDetails.getEmail());
        userInfo.setName(userDetails.getName());
        userInfo.setSurname(userDetails.getSurname());
        role = userDetails.getRoles();
        userInfo.setRoles(userDetails.getRoles());
        userInfo.setPassword(userDetails.getPassword());
        userInfo.setNumber(userDetails.getNumber());
        if (role.contains(roleUser)) {
            userInfo.setQuestionnaire(userDetails.getQuestionnaire());
            userInfo.setLocation(userDetails.getQuestionnaire().getLocation());
            userInfo.setGender(userDetails.getQuestionnaire().getGender());
            userInfo.setLanguage(userDetails.getQuestionnaire().getLanguage());
        }else {
            userInfo.setLocation(userDetails.getLocation());
            userInfo.setGender(userDetails.getGender());
            userInfo.setLanguage(userDetails.getLanguage());
        }
        userInfo.setExperience(userDetails.getExperience());
        userInfo.setResetToken(userDetails.getResetToken());
        userInfo.setExpirationTime(userDetails.getExpirationTime());

        return userInfo;
    }

    public User createUserFromDetails(User userDetails) {
        User user = new User();
        user.setId(userDetails.getId());
        user.setEmail(userDetails.getEmail());
        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setRoles(userDetails.getRoles());
        user.setPassword(userDetails.getPassword());
        user.setNumber(userDetails.getNumber());
        user.setLocation(userDetails.getLocation());
        user.setExperience(userDetails.getExperience());
        user.setGender(userDetails.getGender());
        user.setLanguage(userDetails.getLanguage());
        return user;
    }

    public User mapUserDetailsToUser(User userDetails) {
        User user = new User();
        user.setId(userDetails.getId());
        user.setEmail(userDetails.getEmail());
        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setRoles(userDetails.getRoles());
        user.setPassword(userDetails.getPassword());
        user.setNumber(userDetails.getNumber());
        user.setQuestionnaire(userDetails.getQuestionnaire());
        user.setLocation(userDetails.getQuestionnaire().getLocation());
        user.setExperience(userDetails.getExperience());
        user.setGender(userDetails.getQuestionnaire().getGender());
        user.setLanguage(userDetails.getQuestionnaire().getLanguage());
        return user;
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

    @PostMapping("/auth/questionnaireAnswers")
    public ResponseEntity<?>  questionnaireAnswers(@RequestBody @Valid QuestionnaireDto questionnaireDto){
        return ResponseEntity.ok(questionnaireDto);
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

        Collection<Roles> role;
        Roles roleUser = new Roles(1,"ROLE_USER");

        UserInfo userInfo = new UserInfo();
        userInfo.setId(userDetails.getId());
        userInfo.setEmail(userDetails.getUsername());
        userInfo.setName(userDetails.getName());
        userInfo.setSurname(userDetails.getSurname());
        role = userDetails.getRoles();
        userInfo.setRoles(userDetails.getRoles());
        userInfo.setPassword(userDetails.getPassword());
        userInfo.setNumber(userDetails.getNumber());
        if (role.contains(roleUser)) {
            userInfo.setQuestionnaire(userDetails.getQuestionnaire());
            userInfo.setLocation(userDetails.getQuestionnaire().getLocation());
            userInfo.setGender(userDetails.getQuestionnaire().getGender());
            userInfo.setLanguage(userDetails.getQuestionnaire().getLanguage());
        }else {
            userInfo.setLocation(userDetails.getLocation());
            userInfo.setGender(userDetails.getGender());
            userInfo.setLanguage(userDetails.getLanguage());
        }
        userInfo.setExperience(userDetails.getExperience());
        userInfo.setResetToken(userDetails.getResetToken());
        userInfo.setExpirationTime(userDetails.getExpirationTime());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/auth/allUserinfo")
    public ResponseEntity<?> getAllUserInfo(){
        List<UserInfo> userInfos = getAllWithRole("ROLE_USER");

        return ResponseEntity.ok(userInfos);
    }

    @GetMapping("/auth/userinfoId/{id}")
    public ResponseEntity<?> getUserInfoId(@PathVariable int id){
        User userDetails = userRepository.findById(id).get();

        UserInfo userInfo = convertToUserInfo(userDetails);

        return ResponseEntity.ok(userInfo);
    }
    @GetMapping("/auth/allTherapistInfo")
    public ResponseEntity<?> getAllTherapistInfo(){
        List<UserInfo> therapistInfos = getAllWithRole("ROLE_THERAPIST");

        return ResponseEntity.ok(therapistInfos);
    }

    @GetMapping("/auth/fetchAllTherapistNotConnectedData/{id}")
    public ResponseEntity<?> fetchAllTherapistNotConnectedData(@PathVariable int id){
        List<UserInfo> therapistInfos = getAllWithRole("ROLE_THERAPIST").stream()
                .filter(userInfo -> userInfo.getId() != id)
                .collect(Collectors.toList());

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

    @GetMapping("/auth/allAdminInfo")
    public ResponseEntity<?> getAllAdminInfo(){
        List<UserInfo> adminInfos = getAllWithRole("ROLE_ADMIN");

        return ResponseEntity.ok(adminInfos);
    }

    @PostMapping ("/auth/userTherapistConnection")
    public ResponseEntity<User> userTherapistConnection(@RequestBody @Valid Connection connection){
        User user = userRepository.findById(connection.getUserId()).get();
        User therapist = userRepository.findById(connection.getTherapistId()).get();
        user.setToken(userAuthenticationProvider.createToken(user.getEmail()));
        userService.connect(user.getId(),therapist.getId());
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }


    @GetMapping("/auth/fetchUserTherapistConnectionData/{id}")
    public ResponseEntity<?> fetchUserTherapistConnectionData(@PathVariable int id){
        User user1 = userService.findUserConnectionsById(id);
        if(user1 == null){
            return new ResponseEntity<>("Connect with a therapist!!!", HttpStatus.NOT_FOUND);
        }
        int idTherapist = userService.findTherapistIdByUserId(id);
        User user = userRepository.findById(idTherapist).get();

        UserInfo userInfo = convertToUserInfo(user);
        return ResponseEntity.ok(userInfo);
    }

    @DeleteMapping("/auth/removeTherapist/{id}")
    public void removeTherapist(@PathVariable int id) {
        userService.removeTherapist(id);
    }

    @GetMapping("/auth/fetchAllUsersConnectedData/{id}")
    public ResponseEntity<?> fetchAllUsersConnectedData(@PathVariable int id){
        List<User> userInfos = userService.findAllUsersConnectedById(id).stream().map(this::mapUserDetailsToUser).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @GetMapping("/auth/fetchAllUsersConnectedDataHistory/{id}")
    public ResponseEntity<?> fetchAllUsersConnectedDataHistory(@PathVariable int id){
        List<User> userInfos = userService.findAllUsersConnectedHistoryById(id).stream().map(this::mapUserDetailsToUser).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @GetMapping("/auth/therapistFilterByGender/{gender}")
    public ResponseEntity<?> therapistFilterByGender(@PathVariable String gender) {
        List<User> userInfos = userService.findAllTherapistsByGender(gender).stream().map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByGenderNotConnected")
    public ResponseEntity<?> therapistFilterByGenderNotConnected(@RequestBody @Valid FilterDto filterObject) {
        List<User> userInfos = userService.findAllTherapistsByGender(filterObject.getGender()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId()).map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @GetMapping("/auth/therapistFilterByExperience/{experience}")
    public ResponseEntity<?> therapistFilterByExperience(@PathVariable int experience){
        List<User> userInfos = userService.findAllTherapistsByExperience(experience).stream().map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByExperienceNotConnected")
    public ResponseEntity<?> therapistFilterByExperienceNotConnected(@RequestBody @Valid FilterDto filterObject){
        List<User> userInfos = userService.findAllTherapistsByExperience(filterObject.getExperience()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId()).map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }


    @GetMapping("/auth/therapistFilterByLocation/{location}")
    public ResponseEntity<?> therapistFilterByLocation(@PathVariable String location){
        List<User> userInfos = userService.findAllTherapistsByLocation(location).stream().map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByLocationNotConnected")
    public ResponseEntity<?> therapistFilterByLocationNotConnected(@RequestBody @Valid FilterDto filterObject){
        List<User> userInfos = userService.findAllTherapistsByLocation(filterObject.getLocation()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId()).map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

}
