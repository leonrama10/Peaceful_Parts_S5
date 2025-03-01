package com.brogramer.peacefulPaths.controller;

import com.brogramer.peacefulPaths.config.UserAuthenticationProvider;
import com.brogramer.peacefulPaths.dao.QuestionnaireRepository;
import com.brogramer.peacefulPaths.dao.TherapistInfoRepository;
import com.brogramer.peacefulPaths.dao.TherapistRepository;
import com.brogramer.peacefulPaths.dtos.*;
import com.brogramer.peacefulPaths.entity.*;
import com.brogramer.peacefulPaths.responses.UserInfo;
import com.brogramer.peacefulPaths.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.brogramer.peacefulPaths.dtos.FeedbackDto;


import java.net.URI;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    private final TherapistRepository userRepository;
    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final QuestionnaireRepository questionnaireRepository;
    private final TherapistInfoRepository therapistInfoRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public AuthController(UserService userService, UserAuthenticationProvider userAuthenticationProvider, TherapistRepository userRepository, QuestionnaireRepository questionnaireRepository, TherapistInfoRepository therapistInfoRepository) {
        this.userService = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.userRepository = userRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.therapistInfoRepository = therapistInfoRepository;
    }

    public List<UserInfo> getAllWithRole(String role) {
        return userService.findAllByRole(role).stream().map(this::convertToUserInfo).collect(Collectors.toList());
    }

    public UserInfo convertToUserInfo(User userDetails) {

        Collection<Roles> role;
        Roles roleUser = new Roles(1,"ROLE_USER");
        Roles roleTherapist = new Roles(2,"ROLE_THERAPIST");

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
            userInfo.setTherapistGender(userDetails.getQuestionnaire().getTherapistGender());
            userInfo.setLanguage(userDetails.getQuestionnaire().getLanguage());
            userInfo.setTherapyTypeUser(userDetails.getQuestionnaire().getTherapyType());
            userInfo.setIdentityTypeUser(userDetails.getQuestionnaire().getIdentityType());
            userInfo.setTherapistTypeUser(userDetails.getQuestionnaire().getTherapistType());
            userInfo.setCommunication(userDetails.getQuestionnaire().getCommunication());
            userInfo.setMedicationHistory(userDetails.getQuestionnaire().getMedicationHistory());
            userInfo.setPhysicalHealth(userDetails.getQuestionnaire().getPhysicalHealth());
            userInfo.setMentalState1(userDetails.getQuestionnaire().getMentalState1());
            userInfo.setMentalState2(userDetails.getQuestionnaire().getMentalState2());
            userInfo.setRelationshipStatus(userDetails.getQuestionnaire().getRelationshipStatus());
            userInfo.setTherapyHistory(userDetails.getQuestionnaire().getTherapyHistory());
        }else if(role.contains(roleTherapist)){
            userInfo.setLocation(userDetails.getLocation());
            userInfo.setGender(userDetails.getGender());
            userInfo.setLanguage(userDetails.getLanguage());
            userInfo.setUniversity(userDetails.getUniversity());
            userInfo.setDateOfBirth(userDetails.getDateOfBirth());
            userInfo.setTherapistInfo(userDetails.getTherapistInfo());
            userInfo.setTherapyTypeTherapist(userDetails.getTherapistInfo().getTherapyType());
            userInfo.setTherapistTypeTherapist(userDetails.getTherapistInfo().getTherapistType());
            userInfo.setIdentityTypeTherapist(userDetails.getTherapistInfo().getIdentityType());
            userInfo.setAbout(userDetails.getTherapistInfo().getAbout());
            userInfo.setExperience(userDetails.getExperience());
        }else{
            userInfo.setGender(userDetails.getGender());
        }
        userInfo.setResetToken(userDetails.getResetToken());
        userInfo.setToken(userDetails.getToken());
        userInfo.setExpirationTime(userDetails.getExpirationTime());
        userInfo.setDateAdded(userDetails.getDateAdded());

        return userInfo;
    }

    public User converToUser(UserInfo userDetails) {

        User user = new User();
        Collection<Roles> role;
        Roles roleUser = new Roles(1,"ROLE_USER");
        Roles roleTherapist = new Roles(2,"ROLE_THERAPIST");

        user.setId(userDetails.getId());
        user.setEmail(userDetails.getEmail());
        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setPassword(userDetails.getPassword());
        user.setNumber(userDetails.getNumber());
        user.setGender(userDetails.getGender());
        role = userDetails.getRoles();
        user.setRoles(userDetails.getRoles());
        if (role.contains(roleUser)) {
            Questionnaire questionnaire = userDetails.getQuestionnaire();
            questionnaire.setLocation(userDetails.getLocation());
            questionnaire.setLanguage(userDetails.getLanguage());
            questionnaire.setTherapistGender(userDetails.getTherapistGender());
            questionnaire.setTherapyHistory(userDetails.getTherapyHistory());
            questionnaire.setTherapyType(userDetails.getTherapyTypeUser());
            questionnaire.setIdentityType(userDetails.getIdentityTypeUser());
            questionnaire.setTherapistType(userDetails.getTherapistTypeUser());
            questionnaire.setCommunication(userDetails.getCommunication());
            questionnaire.setMedicationHistory(userDetails.getMedicationHistory());
            questionnaire.setMentalState1(userDetails.getMentalState1());
            questionnaire.setMentalState2(userDetails.getMentalState2());
            questionnaire.setPhysicalHealth(userDetails.getPhysicalHealth());
            questionnaire.setRelationshipStatus(userDetails.getRelationshipStatus());

            questionnaireRepository.save(questionnaire);

            user.setQuestionnaire(questionnaire);
        }else if(role.contains(roleTherapist)){
            user.setUniversity(userDetails.getUniversity());
            user.setDateOfBirth(userDetails.getDateOfBirth());
            user.setLocation(userDetails.getLocation());
            user.setLanguage(userDetails.getLanguage());
            user.setExperience(userDetails.getExperience());
            TherapistInfo therapistInfo = userDetails.getTherapistInfo();
            therapistInfo.setTherapistType(userDetails.getTherapistTypeTherapist());
            therapistInfo.setTherapyType(userDetails.getTherapyTypeTherapist());
            therapistInfo.setIdentityType(userDetails.getIdentityTypeTherapist());

            therapistInfoRepository.save(therapistInfo);

            user.setTherapistInfo(therapistInfo);
        }
        user.setExpirationTime(userDetails.getExpirationTime());
        user.setResetToken(userDetails.getResetToken());
        user.setToken(userDetails.getToken());
        user.setDateAdded(userDetails.getDateAdded());

        return user;
    }

    public NoteDto convertToNoteDto(Notes notes) {
        NoteDto noteDto = new NoteDto();
        noteDto.setId(notes.getId());
        noteDto.setNotesText(notes.getNotesText());
        ArrayList<String> pointCollection = new ArrayList<>();
        for (Point point : notes.getMainPoints().getPoint()){
            String pointString = point.getPoint();
            pointCollection.add(pointString);
        }
        noteDto.setMainPoints(pointCollection);
        noteDto.setMainPointsId(notes.getMainPoints().getId());
        noteDto.setPatientMoodAfter(notes.getPatientMoodAfter());
        noteDto.setPatientMoodBefore(notes.getPatientMoodBefore());
        noteDto.setDateAdded(notes.getDateAdded());

        return noteDto;
    }

    public UserConnectionsHistoryDto convertUserConnectionsHistoryToUserInfo(UserConnectionsHistory userConnectionsHistory) {
        UserConnectionsHistoryDto userInfo = new UserConnectionsHistoryDto();
        userInfo.setUserId(userConnectionsHistory.getUserId());
        userInfo.setTherapistId(userConnectionsHistory.getTherapistId());
        userInfo.setRemoveDate(userConnectionsHistory.getRemoveDate());
        userInfo.setDateAdded(userConnectionsHistory.getDateAdded());

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

    public UserInfo mapUserDetailsToUser(User userDetails) {
        UserInfo user = new UserInfo();
        user.setId(userDetails.getId());
        user.setEmail(userDetails.getEmail());
        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setRoles(userDetails.getRoles());
        user.setPassword(userDetails.getPassword());
        user.setNumber(userDetails.getNumber());
        user.setQuestionnaire(userDetails.getQuestionnaire());
        user.setLocation(userDetails.getQuestionnaire().getLocation());
        user.setGender(userDetails.getQuestionnaire().getGender());
        user.setLanguage(userDetails.getQuestionnaire().getLanguage());
        user.setDateAdded(userDetails.getDateAdded());
        return user;
    }

    public UserInfo mapUserDetailsToUserConnectionsHistoryDto(UserConnectionsHistoryDto userDetails) {
        UserInfo user = new UserInfo();
        user.setId(userDetails.getId());
        user.setEmail(userDetails.getEmail());
        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setNumber(userDetails.getNumber());
        user.setLocation(userDetails.getLocation());
        user.setGender(userDetails.getGender());
        user.setDateAdded(userDetails.getDateAdded());
        user.setRemoveDate(userDetails.getRemoveDate());
        return user;
    }

    private TherapistWorkDaysDto convertToTherapySessionDto(TherapistWorkDays therapistWorkDays) {
        TherapistWorkDaysDto therapistWorkDaysDto = new TherapistWorkDaysDto();

        therapistWorkDaysDto.setTherapistId(therapistWorkDays.getTherapistId());
        therapistWorkDaysDto.setDays(therapistWorkDays.getWeekdays());
        therapistWorkDaysDto.setWorkhours(therapistWorkDays.getWorkhours());

        return therapistWorkDaysDto;
    }

    private WorkhoursDto convertToWorkhoursDto(Workhours workhours) {
        WorkhoursDto workhoursDto = new WorkhoursDto();

        workhoursDto.setHour(workhours.getHour());
        workhoursDto.setId(workhours.getId());

        return workhoursDto;
    }

    private BookingsDto convertToBookingsDto(Bookings bookings) {
        BookingsDto bookingsDto = new BookingsDto();

        bookingsDto.setBookingId(bookings.getId());
        bookingsDto.setHour(bookings.getHour());
        bookingsDto.setClientId(bookings.getClientId());
        bookingsDto.setTherapistId(bookings.getTherapistWorkDays().getTherapistId());
        bookingsDto.setDate(bookings.getDate());
        bookingsDto.setEndSessionBoolean(bookings.getEndSessionBoolean());

        return bookingsDto;
    }

    private BookingsDto convertBookingsHistoryToBookingsDto(BookingsHistory bookings) {
        BookingsDto bookingsDto = new BookingsDto();

        bookingsDto.setBookingId(bookings.getId());
        bookingsDto.setHour(bookings.getHour());
        bookingsDto.setClientId(bookings.getClientId());
        bookingsDto.setTherapistId(bookings.getTherapistWorkDays().getTherapistId());
        bookingsDto.setDate(bookings.getDate());
        bookingsDto.setEndSessionBoolean(bookings.getEndSessionBoolean());
        bookingsDto.setCanceled(bookings.getCanceled());

        return bookingsDto;
    }

    private WeekdaysDto convertToWeekdaysDto(Weekdays weekdays) {
        WeekdaysDto weekdaysDto = new WeekdaysDto();

        weekdaysDto.setDay(weekdays.getDay());
        weekdaysDto.setId(weekdays.getId());

        return weekdaysDto;
    }

    private ChatDto convertToChatDto(Chat chat) {
        ChatDto chatDto = new ChatDto();

        if (chat==null) {
            return chatDto;
        }
        chatDto.setMessages(chat.getMessages());
        chatDto.setId(chat.getId());

        return chatDto;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserInfo> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        User user = userService.login(credentialsDto);
        user.setToken(userAuthenticationProvider.createToken(credentialsDto.getEmail()));

        userRepository.save(user);

        UserInfo userInfo = convertToUserInfo(user);

        if (credentialsDto.getRememberMe()){
            userInfo.setRefreshToken(userAuthenticationProvider.createRefreshToken(credentialsDto.getEmail()));
        }
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @PostMapping("/auth/registerTherapist")
    public ResponseEntity<UserDto> registerTherapist(@RequestBody @Valid SignUpDto signUpDto) {
        UserDto createdTherapist = userService.registerTherapist(signUpDto);
        return ResponseEntity.created(URI.create("/users/" + createdTherapist.getId())).body(createdTherapist);
    }

    @PostMapping("/auth/registerAdmin")
    public ResponseEntity<UserDto> registerAdmin(@RequestBody @Valid SignUpDto signUpDto) {
        UserDto createdAdmin = userService.registerAdmin(signUpDto);
        return ResponseEntity.created(URI.create("/users/" + createdAdmin.getId())).body(createdAdmin);
    }

    @PostMapping("/auth/questionnaireAnswers")
    public ResponseEntity<?>  questionnaireAnswers(@RequestBody @Valid QuestionnaireDto questionnaireDto){
        return ResponseEntity.ok(questionnaireDto);
    }

    @PutMapping("/auth/update")
    public ResponseEntity<UserDto> update(@RequestBody @Valid UserDto user) {
        UserDto createdUser = userService.update(user);
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @DeleteMapping("/auth/deleteUser/{id}")
    public void delete(@PathVariable int id) {
        userService.delete(id);
    }

    @DeleteMapping("/auth/deleteNote/{id}")
    public void deleteNote(@PathVariable int id) {
        userService.deleteNote(id);
    }

    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal principal){
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(principal.getName());

        Collection<Roles> role;
        Roles roleUser = new Roles(1,"ROLE_USER");
        Roles roleTherapist = new Roles(2,"ROLE_THERAPIST");

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
            userInfo.setTherapistGender(userDetails.getQuestionnaire().getTherapistGender());
            userInfo.setTherapyHistory(userDetails.getQuestionnaire().getTherapyHistory());
            userInfo.setTherapyTypeUser(userDetails.getQuestionnaire().getTherapyType());
            userInfo.setIdentityTypeUser(userDetails.getQuestionnaire().getIdentityType());
            userInfo.setTherapistTypeUser(userDetails.getQuestionnaire().getTherapistType());
            userInfo.setCommunication(userDetails.getQuestionnaire().getCommunication());
            userInfo.setMedicationHistory(userDetails.getQuestionnaire().getMedicationHistory());
            userInfo.setMentalState1(userDetails.getQuestionnaire().getMentalState1());
            userInfo.setMentalState2(userDetails.getQuestionnaire().getMentalState2());
            userInfo.setPhysicalHealth(userDetails.getQuestionnaire().getPhysicalHealth());
            userInfo.setRelationshipStatus(userDetails.getQuestionnaire().getRelationshipStatus());
        }else if (role.contains(roleTherapist)){
            userInfo.setLocation(userDetails.getLocation());
            userInfo.setAbout(userDetails.getTherapistInfo().getAbout());
            userInfo.setGender(userDetails.getGender());
            userInfo.setDateOfBirth(userDetails.getDateOfBirth());
            userInfo.setLanguage(userDetails.getLanguage());
            userInfo.setUniversity(userDetails.getUniversity());
            userInfo.setTherapistInfo(userDetails.getTherapistInfo());
            userInfo.setTherapistTypeTherapist(userDetails.getTherapistInfo().getTherapistType());
            userInfo.setTherapyTypeTherapist(userDetails.getTherapistInfo().getTherapyType());
            userInfo.setIdentityTypeTherapist(userDetails.getTherapistInfo().getIdentityType());
            userInfo.setExperience(userDetails.getExperience());
        }else {
            userInfo.setGender(userDetails.getGender());
        }
        userInfo.setResetToken(userDetails.getResetToken());
        userInfo.setExpirationTime(userDetails.getExpirationTime());
        if (userDetails.getToken() != null ) {
//            if (userDetails.getToken().isEmpty()) {
                Authentication auth = userAuthenticationProvider.validateToken(userDetails.getToken());
                if (auth != null) {
                    // Token has not expired
                    userInfo.setToken(userDetails.getToken());
                } else {
                    // Token has expired
                    userInfo.setToken(userAuthenticationProvider.createToken(userDetails.getUsername()));
                    User user = converToUser(userInfo);
                    userRepository.save(user);
                }
//            }
        } else {
            // Token does not exist
            userInfo.setToken(userAuthenticationProvider.createToken(userDetails.getUsername()));
            User user = converToUser(userInfo);
            userRepository.save(user);
        }

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/auth/allUserinfo")
    public ResponseEntity<?> getAllUserInfo(){
        List<UserInfo> userInfos = getAllWithRole("ROLE_USER");

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/userinfoId")
    public ResponseEntity<?> getUserInfoId(@RequestBody @Valid UserDto userDto){
        User userDetails = userRepository.findById(userDto.getId()).get();

        UserInfo userInfo = convertToUserInfo(userDetails);

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/auth/allTherapistInfo")
    public ResponseEntity<?> getAllTherapistInfo(){
        List<UserInfo> therapistInfos = getAllWithRole("ROLE_THERAPIST");

        return ResponseEntity.ok(therapistInfos);
    }

    @PostMapping("/auth/fetchAllTherapistNotConnectedData")
    public ResponseEntity<?> fetchAllTherapistNotConnectedData(@RequestBody @Valid FilterDto filterDto){
        List<UserInfo> therapistInfos = getAllWithRole("ROLE_THERAPIST").stream()
                .filter(userInfo -> userInfo.getId() != filterDto.getTherapistId())
                .collect(Collectors.toList());

        return ResponseEntity.ok(therapistInfos);
    }

    @PostMapping("/auth/sendEmail")
    public ResponseEntity<UserDto> sendEmail(@RequestBody @Valid CredentialsDto credentialsDto) throws MessagingException {
        UserDto user = userService.findByEmail(credentialsDto.getEmail());
        user.setToken(userAuthenticationProvider.createToken(user.getEmail()));
        userService.sendEmail(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/auth/resetPassword")
    public ResponseEntity<UserDto> resetPassword(@RequestBody @Valid UserDto user) {
        UserDto createdUser = userService.update(user);
//        createdUser.setToken(userAuthenticationProvider.createToken(createdUser.getEmail()));
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
        userService.connect(user.getId(),therapist.getId());
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }

    @PostMapping("/auth/fetchUserTherapistConnectionData")
    public ResponseEntity<?> fetchUserTherapistConnectionData(@RequestBody @Valid UserDto userDto){
        User user1 = userService.findUserConnectionsById(userDto.getId());
        if(user1 == null){
            return new ResponseEntity<>("Connect with a therapist!!!", HttpStatus.NOT_FOUND);
        }
        int idTherapist = userService.findTherapistIdByUserId(userDto.getId());
        User user = userRepository.findById(idTherapist).get();

        UserInfo userInfo = convertToUserInfo(user);
        return ResponseEntity.ok(userInfo);
    }

    @DeleteMapping("/auth/removeTherapist/{id}")
    public void removeTherapist(@PathVariable int id) {
        userService.removeTherapist(id);
    }

    @PostMapping("/auth/fetchAllUsersConnectedData")
    public ResponseEntity<?> fetchAllUsersConnectedData(@RequestBody @Valid UserDto userDto){
        List<UserInfo> userInfos = userService.findAllUsersConnectedById(userDto.getId()).stream().map(this::mapUserDetailsToUser).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/fetchAllUsersConnectedDataHistory")
    public ResponseEntity<?> fetchAllUsersConnectedDataHistory(@RequestBody @Valid UserDto userDto){
        List<UserInfo> userInfos = userService.findAllUsersConnectedHistoryById(userDto.getId()).stream().map(this::mapUserDetailsToUserConnectionsHistoryDto).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByGender")
    public ResponseEntity<?> therapistFilterByGender(@RequestBody @Valid FilterDto filterObject) {
        List<User> userInfos = userService.findAllTherapistsByGender(filterObject.getGender()).stream().map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByGenderNotConnected")
    public ResponseEntity<?> therapistFilterByGenderNotConnected(@RequestBody @Valid FilterDto filterObject) {
        List<User> userInfos = userService.findAllTherapistsByGender(filterObject.getGender()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId()).map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByExperience")
    public ResponseEntity<?> therapistFilterByExperience(@RequestBody @Valid FilterDto filterObject){
        List<User> userInfos = userService.findAllTherapistsByExperience(filterObject.getExperience()).stream().map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByExperienceNotConnected")
    public ResponseEntity<?> therapistFilterByExperienceNotConnected(@RequestBody @Valid FilterDto filterObject){
        List<User> userInfos = userService.findAllTherapistsByExperience(filterObject.getExperience()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId()).map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }


    @PostMapping("/auth/therapistFilterByLocation")
    public ResponseEntity<?> therapistFilterByLocation(@RequestBody @Valid FilterDto filterObject){
        List<User> userInfos = userService.findAllTherapistsByLocation(filterObject.getLocation()).stream().map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByLocationNotConnected")
    public ResponseEntity<?> therapistFilterByLocationNotConnected(@RequestBody @Valid FilterDto filterObject){
        List<User> userInfos = userService.findAllTherapistsByLocation(filterObject.getLocation()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId()).map(this::createUserFromDetails).collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByLanguage")
    public ResponseEntity<?> therapistFilterByLanguage(@RequestBody @Valid FilterDto filterObject){
        List<UserInfo> userInfos = userService.findAllTherapistsByLanguage(filterObject.getLanguage()).stream()
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByLanguageNotConnected")
    public ResponseEntity<?> therapistFilterByLanguageNotConnected(@RequestBody @Valid FilterDto filterObject) {
        List<UserInfo> userInfos = userService.findAllTherapistsByLanguage(filterObject.getLanguage()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId())
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByGetStarted")
    public ResponseEntity<?> therapistFilterByGetStarted(@RequestBody @Valid FilterDto filterObject){
        List<UserInfo> userInfos = userService.findAllTherapistsByGetStarted(filterObject.getUserId()).stream()
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByGetStartedNotConnectedData")
    public ResponseEntity<?> therapistFilterByGetStartedNotConnectedData(@RequestBody @Valid FilterDto filterObject) {
        List<UserInfo> userInfos = userService.findAllTherapistsByGetStarted(filterObject.getUserId()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId())
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByTherapyType")
    public ResponseEntity<?> therapistFilterByTherapyType(@RequestBody @Valid FilterDto filterObject){
        List<UserInfo> userInfos = userService.findAllTherapistsByTherapyType(filterObject.getTherapyType()).stream()
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }


    @PostMapping("/auth/therapistFilterByTherapyNotConnected")
    public ResponseEntity<?> therapistFilterByTherapyNotConnected(@RequestBody @Valid FilterDto filterObject) {
        List<UserInfo> userInfos = userService.findAllTherapistsByTherapyType(filterObject.getTherapyType()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId())
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByIdentityType")
    public ResponseEntity<?> therapistFilterByIdentityType(@RequestBody @Valid FilterDto filterObject){
        List<UserInfo> userInfos = userService.findAllTherapistsByIdentityType(filterObject.getIdentityType()).stream()
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByIdentityTypeNotConnected")
    public ResponseEntity<?> therapistFilterByIdentityTypeNotConnected(@RequestBody @Valid FilterDto filterObject) {
        List<UserInfo> userInfos = userService.findAllTherapistsByIdentityType(filterObject.getIdentityType()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId())
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByTherapistType")
    public ResponseEntity<?> therapistFilterByTherapistType(@RequestBody @Valid FilterDto filterObject){
        List<UserInfo> userInfos = userService.findAllTherapistsByTherapistType(filterObject.getTherapistType()).stream()
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/therapistFilterByTherapistTypeNotConnected")
    public ResponseEntity<?> therapistFilterByTherapistTypeNotConnected(@RequestBody @Valid FilterDto filterObject) {
        List<UserInfo> userInfos = userService.findAllTherapistsByTherapistType(filterObject.getTherapistType()).stream()
                .filter(userInfo -> userInfo.getId() != filterObject.getTherapistId())
                .map(this::convertToUserInfo)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userInfos);
    }

    @PostMapping("/auth/addNewNote")
    public void addNewNote(@RequestBody @Valid NoteDto noteDto) {
        userService.addNewNote(noteDto);
    }

    @PostMapping("/auth/fetchOldNotes")
    public ResponseEntity<?> fetchOldNotes(@RequestBody @Valid NoteDto noteDto) {
        List<NoteDto> noteDtoList = userService.findAllClientTherapistConnectedNotes(noteDto).stream()
                .map(this::convertToNoteDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(noteDtoList);
    }

    @PostMapping("/auth/fetchOldNotesHistory")
    public ResponseEntity<?> fetchOldNotesHistory(@RequestBody @Valid NoteDto noteDto) {
        List<NoteDto> noteDtoList = userService.findAllClientTherapistConnectedNotesHistory(noteDto).stream()
                .map(this::convertToNoteDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(noteDtoList);
    }

    @PostMapping("/auth/fetchAvailableSlots")
    public ResponseEntity<?> fetchAvailableSlots(@RequestBody @Valid TherapistWorkDaysDto therapistWorkDaysDto) {
        List<TherapistWorkDaysDto> noteDtoList = userService.fetchAvailableSlots(therapistWorkDaysDto).stream()
                .map(this::convertToTherapySessionDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(noteDtoList);
    }

    @PostMapping("/auth/selectWorkDays")
    public void selectWorkDays(@RequestBody @Valid TherapistWorkDaysDto therapistWorkDaysDto) {
        userService.selectWorkDays(therapistWorkDaysDto);
    }

    @PostMapping("/auth/fetchBookedHours")
    public ResponseEntity<?> fetchBookedHours(@RequestBody @Valid BookingsDto bookingsDto) {
        List<WorkhoursDto> bookingsDtoList = userService.fetchBookedHours(bookingsDto).stream()
                .map(this::convertToWorkhoursDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingsDtoList);
    }

    @PostMapping("/auth/bookSession")
    public void bookSession(@RequestBody @Valid BookingsDto bookingsDto) {
        userService.bookSession(bookingsDto);
    }

    @PostMapping("/auth/fetchBookings")
    public ResponseEntity<?> fetchBookings(@RequestBody @Valid BookingsDto bookingsDto) {
        List<BookingsDto> bookingsDtoList = userService.fetchByClientIdAndTherapistId(bookingsDto).stream()
                .map(this::convertToBookingsDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingsDtoList);
    }

    @PostMapping("/auth/fetchBookingsHistory")
    public ResponseEntity<?> fetchBookingsHistory(@RequestBody @Valid BookingsDto bookingsDto) {
        List<BookingsDto> bookingsDtoList = userService.fetchBookingsHistoryByClientId(bookingsDto).stream()
                .map(this::convertBookingsHistoryToBookingsDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingsDtoList);
    }

    @PostMapping("/auth/fetchTherapistBookingsHistory")
    public ResponseEntity<?> fetchTherapistBookingsHistory(@RequestBody @Valid BookingsDto bookingsDto) {
        List<BookingsDto> bookingsDtoList = userService.fetchBookingsHistoryByTherapistId(bookingsDto).stream()
                .map(this::convertBookingsHistoryToBookingsDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingsDtoList);
    }

    @PostMapping("/auth/fetchWorkDays")
    public ResponseEntity<?> fetchWorkDays(@RequestBody @Valid WeekdaysDto weekdaysDto) {
        List<WeekdaysDto> weekdaysDtoList = userService.fetchWorkDays(weekdaysDto).stream()
                .map(this::convertToWeekdaysDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(weekdaysDtoList);
    }

    @PostMapping("/auth/fetchWorkHours")
    public ResponseEntity<?> fetchWorkHours(@RequestBody @Valid WeekdaysDto weekdaysDto) {
        List<WorkhoursDto> workhoursDto = userService.fetchWorkHours(weekdaysDto).stream()
                .map(this::convertToWorkhoursDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(workhoursDto);
    }

    @PostMapping("/auth/fetchNextBooking")
    public ResponseEntity<?> fetchNextBooking(@RequestBody @Valid BookingsDto bookingsDto) {
        Optional<Bookings> booking = userService.fetchNextBooking(bookingsDto);

        BookingsDto bookingDto = new BookingsDto();
        if (booking.isPresent()) {
            bookingDto = convertToBookingsDto(booking.get());
        }

        return ResponseEntity.ok(bookingDto);
    }

    @DeleteMapping("/auth/cancelBooking")
    public void cancelBooking(@RequestBody @Valid BookingsDto bookingsDto) {
        userService.cancelBooking(bookingsDto);
    }

    @PostMapping("/auth/fetchBookingByBookingId")
    public ResponseEntity<?> fetchBookingByBookingId(@RequestBody @Valid BookingsDto bookingsDto) {
        Bookings booking = userService.fetchBookingByBookingId(bookingsDto);

        BookingsDto bookingDto = convertToBookingsDto(booking);

        return ResponseEntity.ok(bookingDto);
    }

    @PutMapping("/auth/updateBookingSession")
    public void updateBookingSession(@RequestBody @Valid BookingsDto bookingsDto) {
        userService.updateBookingSession(bookingsDto);
    }

    @PostMapping("/auth/fetchBookedHoursInEdit")
    public ResponseEntity<?> fetchBookedHoursInEdit(@RequestBody @Valid BookingsDto bookingsDto) {
        List<WorkhoursDto> bookingsDtoList = userService.fetchBookedHoursInEdit(bookingsDto).stream()
                .map(this::convertToWorkhoursDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingsDtoList);
    }

    @PostMapping("/auth/fetchAllUserTherapistOldConnectionData")
    public ResponseEntity<?> fetchAllUserTherapistOldConnectionData(@RequestBody @Valid ConnectionDto connectionDto) {
        List<UserConnectionsHistoryDto> therapistDtoList = userService.fetchAllUserTherapistOldConnectionData(connectionDto);
        return ResponseEntity.ok(therapistDtoList);
    }

    @PostMapping("/auth/fetchUserTherapistChats")
    public ResponseEntity<?> fetchUserTherapistChats(@RequestBody @Valid ConnectionDto connectionDto) {
        Chat chat = userService.fetchUserTherapistChats(connectionDto);

        ChatDto chatDto = convertToChatDto(chat);

        return ResponseEntity.ok(chatDto);
    }

    @PostMapping("/auth/sendMessage")
    public void sendMessage(@RequestBody @Valid MessageDto messageDto) {
        userService.sendMessage(messageDto);
    }

    @PostMapping("/auth/fetchTherapistUserConnectionData")
    public ResponseEntity<?> fetchTherapistUserConnectionData(@RequestBody @Valid ConnectionDto connectionDto){
        User user = userService.findTherapistConnectionById(connectionDto);
        UserInfo userInfo = new UserInfo();

        if (user!=null){
            userInfo = convertToUserInfo(user);
        }

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/auth/fetchAllNextBookings")
    public ResponseEntity<?> fetchAllNextBookings(@RequestBody @Valid BookingsDto bookingsDto){
        List<BookingsDto> bookingDto = userService.fetchAllNextBookings(bookingsDto).stream()
                .map(this::convertToBookingsDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(bookingDto);
    }

    @PostMapping("/auth/fetchNote")
    public ResponseEntity<?> fetchNote(@RequestBody @Valid NoteDto noteDto){
        Notes note = userService.fetchNote(noteDto);

        NoteDto noteDto1 = convertToNoteDto(note);

        return ResponseEntity.ok(noteDto1);
    }

    @PutMapping("/auth/updateNote")
    public void updateNote(@RequestBody @Valid NoteDto noteDto){
        userService.updateNote(noteDto);
    }

    @PutMapping("/auth/endSessionBoolean")
    public void endSessionBoolean(@RequestBody @Valid BookingsDto bookingsDto){
        userService.endSessionBoolean(bookingsDto);
    }

    @PostMapping("/auth/sendAdviceToUser")
    public ResponseEntity<?> sendAdviceToUser(@RequestBody @Valid AdviceDto adviceDto) {
        userService.sendAdvice(adviceDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/fetchAdviceForUser")
    public ResponseEntity<?> fetchAdviceForUser(@RequestBody @Valid AdviceDto adviceDto2) {
        try {
            List<AdviceDto> adviceList = userService.findAdviceByUserId(adviceDto2.getUserId()).stream()
                    .map(advice -> {
                        AdviceDto adviceDto = new AdviceDto();
                        adviceDto.setUserId(advice.getUser().getId());
                        adviceDto.setTherapistId(advice.getTherapist_id().getId());
                        adviceDto.setAdvice(advice.getAdviceText());
                        adviceDto.setDateAdded(advice.getDateAdded());
                        return adviceDto;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(adviceList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching advice: " + e.getMessage());
        }
    }

    @PostMapping("/auth/submitFeedback")
    public ResponseEntity<?> submitFeedback(@RequestBody @Valid FeedbackDto feedbackDto) {
        userService.saveFeedback(feedbackDto);
        return ResponseEntity.ok("Feedback submitted successfully");
    }

    @PostMapping("/auth/fetchFeedback")
    public ResponseEntity<?> fetchFeedback(@RequestBody @Valid FeedbackDto feedbackDto) {
        List<FeedbackDto> feedbackList = userService.fetchFeedback(feedbackDto).stream()
                .map(feedback -> {
                    FeedbackDto feedbackDto1 = new FeedbackDto();
                    feedbackDto1.setUserId(feedback.getUserId().getId());
                    feedbackDto1.setFeedback(feedback.getFeedback());
                    feedbackDto1.setDateAdded(feedback.getDateAdded());
                    return feedbackDto1;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(feedbackList);
    }

    @PostMapping("/auth/fetchConnectionsAmount")
    public ResponseEntity<?> fetchConnectionsAmount(@RequestBody @Valid ConnectionDto connectionDto){
        int connectionsAmount = userService.fetchConnectionsAmount(connectionDto);

        ConnectionDto connectionDto1 = new ConnectionDto();
        connectionDto1.setAmount(connectionsAmount);

        return ResponseEntity.ok(connectionDto1);
    }

}