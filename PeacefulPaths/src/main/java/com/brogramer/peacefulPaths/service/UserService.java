package com.brogramer.peacefulPaths.service;

import com.brogramer.peacefulPaths.dao.*;
import com.brogramer.peacefulPaths.dtos.*;
import com.brogramer.peacefulPaths.entity.*;
import com.brogramer.peacefulPaths.exceptions.AppException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final TherapistRepository userRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final TherapistInfoRepository therapistInfoRepository;
    private final NoteRepository noteRepository;
    private final TherapistNotesRepository therapistNotesRepository;
    private final TherapistNotesHistoryRepository therapistNotesHistoryRepository;
    private final TherapistWorkDaysRepository therapistWorkDaysRepository;
    private final MainPointsRepository mainPointsRepository;
    private final PointRepository pointRepository;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;
    private final UserDao userDao;

    @Autowired
    private JavaMailSender javaMailSender;

    public UserService(TherapistRepository userRepository, PasswordEncoder passwordEncoder,RoleDao roleDao,UserDao userDao,QuestionnaireRepository questionnaireRepository,TherapistInfoRepository therapistInfoRepository,NoteRepository noteRepository,TherapistNotesRepository therapistNotesRepository,MainPointsRepository mainPointsRepository,PointRepository pointRepository,TherapistNotesHistoryRepository therapistNotesHistoryRepository,TherapistWorkDaysRepository therapistWorkDaysRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleDao = roleDao;
        this.userDao = userDao;
        this.questionnaireRepository = questionnaireRepository;
        this.therapistInfoRepository = therapistInfoRepository;
        this.noteRepository = noteRepository;
        this.therapistNotesRepository = therapistNotesRepository;
        this.therapistNotesHistoryRepository = therapistNotesHistoryRepository;
        this.mainPointsRepository = mainPointsRepository;
        this.pointRepository = pointRepository;
        this.therapistWorkDaysRepository = therapistWorkDaysRepository;
    }

    public List<User> findAllByRole(String role) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName(role));
        return userRepository.findAllByRolesIn(roles);
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userDao.findByEmailDAO(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid email or password.");
        }
        return new CustomUserDetails(user);
    }

    public UserDto convertToUserDto(User savedUser) {
        UserDto userDto1 = new UserDto();

        userDto1.setEmail(savedUser.getEmail());
        userDto1.setId(savedUser.getId());
        userDto1.setName(savedUser.getName());
        userDto1.setSurname(savedUser.getSurname());
        userDto1.setNumber(savedUser.getNumber());
        userDto1.setToken(savedUser.getToken());
        userDto1.setRoles(savedUser.getRoles());
        userDto1.setPassword(savedUser.getPassword());

        return userDto1;
    }

    public UserDto findUserByEmailAndConvert(String email) {
        Optional<User> user1 = userRepository.findByEmail(email);

        if (!user1.isPresent()){
            return null;
        }
        User user = user1.get();

        UserDto userDto = new UserDto();
        Collection<Roles> role;

        Roles roleUser = new Roles(1,"ROLE_USER");

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setNumber(user.getNumber());
        role = user.getRoles();
        userDto.setRoles(user.getRoles());
        userDto.setPassword(user.getPassword());
        if (role.contains(roleUser)) {
            userDto.setLocation(user.getQuestionnaire().getLocation());
            userDto.setGender(user.getQuestionnaire().getGender());
            userDto.setLanguage(user.getQuestionnaire().getLanguage());
        }else {
            user.setLocation(userDto.getLocation());
            user.setGender(userDto.getGender());
            user.setLanguage(userDto.getLanguage());
        }
        userDto.setExperience(user.getExperience());

        return userDto;
    }

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
        user.setNumber(userDto.getNumber());
        LocalDateTime localDateTime = LocalDateTime.now();
        user.setDateAdded(localDateTime);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        Collection<Roles> collection = new ArrayList<>();
        collection.add(roleDao.findRoleByName("ROLE_USER"));
        user.setRoles(collection);

        Questionnaire questionnaire = questionnaire(userDto.getQuestionnaire());
        user.setQuestionnaire(questionnaire);

        User savedUser = userRepository.save(user);

        return convertToUserDto(savedUser);
    }

    public Questionnaire questionnaire(Questionnaire questionnaire) {
        questionnaireRepository.save(questionnaire);
        return questionnaire;
    }

    public UserDto registerTherapist(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());
        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setNumber(userDto.getNumber());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setExperience(userDto.getExperience());
        user.setDateOfBirth(userDto.getDateOfBirth());
        LocalDateTime localDateTime = LocalDateTime.now();
        user.setDateAdded(localDateTime);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        user.setGender(userDto.getGender());
        user.setUniversity(userDto.getUniversity());
        user.setLocation(userDto.getLocation());
        user.setLanguage(userDto.getLanguage());
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));
        user.setRoles(roles);
        TherapistInfo therapistInfo = new TherapistInfo();
        therapistInfo.setTherapistType(userDto.getTherapistType());
        therapistInfo.setTherapyType(userDto.getTherapyType());
        therapistInfo.setIdentityType(userDto.getIdentityType());

        therapistInfoRepository.save(therapistInfo);

        user.setTherapistInfo(therapistInfo);

        User savedUser = userRepository.save(user);

        UserDto userDtoResult = new UserDto();
        userDtoResult.setEmail(savedUser.getEmail());
        userDtoResult.setId(savedUser.getId());
        userDtoResult.setName(savedUser.getName());
        userDtoResult.setSurname(savedUser.getSurname());
        userDtoResult.setNumber(savedUser.getNumber());
        userDtoResult.setToken(savedUser.getToken());
        userDtoResult.setRoles(savedUser.getRoles());
        userDtoResult.setPassword(savedUser.getPassword());
        userDtoResult.setExperience(savedUser.getExperience());
        userDtoResult.setGender(savedUser.getGender());
        userDtoResult.setUniversity(savedUser.getUniversity());
        userDtoResult.setLocation(savedUser.getLocation());
        userDtoResult.setLanguage(savedUser.getLanguage());

        return userDtoResult;
    }

    public UserDto registerAdmin(SignUpDto userDto) {
        // Check if the user (Admin) already exists based on email
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());
        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        // Create a new User entity for the Admin
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setNumber(userDto.getNumber());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        LocalDateTime localDateTime = LocalDateTime.now();
        user.setDateAdded(localDateTime);
        // Encode the password
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        // Set gender and university from the DTO
        user.setGender(userDto.getGender());

        // Assign the ROLE_THERAPIST to this user
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_ADMIN"));
        user.setRoles(roles);

        // Save the new therapist user to the database
        User savedUser = userRepository.save(user);

        // Create and return a DTO for the saved user
        UserDto userDtoResult = new UserDto();
        userDtoResult.setEmail(savedUser.getEmail());
        userDtoResult.setId(savedUser.getId());
        userDtoResult.setName(savedUser.getName());
        userDtoResult.setSurname(savedUser.getSurname());
        userDtoResult.setNumber(savedUser.getNumber());
        userDtoResult.setToken(savedUser.getToken());
        userDtoResult.setRoles(savedUser.getRoles());
        userDtoResult.setPassword(savedUser.getPassword());
        userDtoResult.setGender(savedUser.getGender());

        return userDtoResult;
    }

    public UserDto update(UserDto userDto) {
        Optional<User> emailUser = userRepository.findByEmail(userDto.getEmail());

        User user = new User();
        Collection<Roles> role;
        Roles roleUser = new Roles(1,"ROLE_USER");

        if (emailUser.isPresent()){
            if (emailUser.get().getId()==userDto.getId()) {
                user.setId(userDto.getId());
                user.setEmail(userDto.getEmail());
                user.setName(userDto.getName());
                user.setSurname(userDto.getSurname());
                if (emailUser.get().getPassword().equals(userDto.getPassword())) {
                    user.setPassword(emailUser.get().getPassword());
                }else {
                    user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
                }
                user.setNumber(userDto.getNumber());
                role = userDto.getRoles();
                user.setRoles(userDto.getRoles());
                if (role.contains(roleUser)) {
                    Questionnaire questionnaire = userDto.getQuestionnaire();
                    questionnaire.setLocation(userDto.getLocation());
                    questionnaire.setGender(userDto.getGender());
                    questionnaire.setLanguage(userDto.getLanguage());

                    questionnaireRepository.save(questionnaire);

                    user.setQuestionnaire(questionnaire);
                }else {
                    user.setUniversity(userDto.getUniversity());
                    user.setLocation(userDto.getLocation());
                    user.setGender(userDto.getGender());
                    user.setLanguage(userDto.getLanguage());
                }
                user.setExperience(userDto.getExperience());
                user.setExpirationTime(userDto.getExpirationTime());
                user.setResetToken(userDto.getResetToken());
            }
            else {
                throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
            }
        }else {
            user.setId(userDto.getId());
            user.setEmail(userDto.getEmail());
            user.setName(userDto.getName());
            user.setSurname(userDto.getSurname());
            user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
            user.setNumber(userDto.getNumber());
            role = userDto.getRoles();
            user.setRoles(userDto.getRoles());
            if (role.contains(roleUser)) {
                Questionnaire questionnaire = userDto.getQuestionnaire();
                questionnaire.setLocation(userDto.getLocation());
                questionnaire.setGender(userDto.getGender());
                questionnaire.setLanguage(userDto.getLanguage());

                questionnaireRepository.save(questionnaire);

                user.setQuestionnaire(questionnaire);
            }else {
                user.setUniversity(userDto.getUniversity());
                user.setLocation(userDto.getLocation());
                user.setGender(userDto.getGender());
                user.setLanguage(userDto.getLanguage());
            }
            user.setExperience(userDto.getExperience());
            user.setExpirationTime(userDto.getExpirationTime());
            user.setResetToken(userDto.getResetToken());
        }

        User savedUser = userRepository.save(user);

        UserDto userDto1 = convertToUserDto(savedUser);

        if (role.contains(roleUser)) {
            userDto1.setQuestionnaire(userDto.getQuestionnaire());
            userDto1.getQuestionnaire().setLocation(userDto.getLocation());
            userDto1.getQuestionnaire().setGender(userDto.getGender());
            userDto1.getQuestionnaire().setLanguage(userDto.getLanguage());
        }else {
            userDto1.setUniversity(userDto.getUniversity());
            userDto1.setLocation(userDto.getLocation());
            userDto1.setGender(userDto.getGender());
            userDto1.setLanguage(userDto.getLanguage());
        }
        userDto1.setExperience(savedUser.getExperience());
        userDto1.setExpirationTime(savedUser.getExpirationTime());
        userDto1.setResetToken(savedUser.getResetToken());

        return userDto1;
    }

    public UserDto findByLogin(String login,String token) {
        UserDto userDto = findUserByEmailAndConvert(login);
        userDto.setToken(token);
        return userDto;
    }

    public void delete(int id) {
        User theUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        theUser.getRoles().clear();

        userRepository.deleteById(id);
    }

    public UserDto findByEmail(String email) {

        return findUserByEmailAndConvert(email);
    }

    public void sendEmail(UserDto user) throws MessagingException {
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setExpirationTime(System.currentTimeMillis() + (60 * 10 * 1000));

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(user.getEmail());
        helper.setSubject("Forgotten password reset");

        String verificationLink = "<a href='http://localhost:3000/passwordReset/" + token + "'>Click here to reset your password.</a>";

        String emailContent = "<p>Hello,</p>" +
                "<p>" + verificationLink + "</p>" +
                "<p>If you didn't request this email or have any questions, please contact us at markaj.leka@gmail.com</p>" +
                "<p>Thanks,<br>PeacefulParts team</p>";

        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    @Transactional
    public void connect(int userId, int therapistId) {
        userRepository.addConnection(userId,therapistId);
        userRepository.addConnectionHistory(userId,therapistId);
    }

    public int findTherapistIdByUserId(int id) {
        return userRepository.findTherapistIdByUserId(id);
    }

    public void removeTherapist(int userId) {
        userRepository.deleteConnection(userId);
    }

    public User findUserConnectionsById(int userId) {
        Integer id = userRepository.findUserConnectionById(userId);

        if(id == null){
            return null;
        }

        return userRepository.findById(id)
                .orElseThrow(null);
    }

    public Collection<User> findAllUsersConnectedById(int id) {
        Collection<User> users = new ArrayList<>();
        Collection<Integer> userId = userRepository.findAllUsersConnectedById(id);
        for (Integer i : userId) {
            users.add(userRepository.findById(i).get());
        }

        return users;
    }

    public Collection<User> findAllUsersConnectedHistoryById(int id) {
        Collection<User> users = new ArrayList<>();
        Collection<Integer> userId = userRepository.findAllUsersConnectedHistoryById(id);
        for (Integer i : userId) {
            users.add(userRepository.findById(i).get());
        }

        return users;
    }

    public Collection<User> findAllTherapistsByGender(String gender) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));
        Collection<User> therapists = new ArrayList<>();
        List<User> user = userRepository.findAllByRolesIn(roles);
        for (User u : user) {
            if(u.getGender().getGender().equals(gender)){
                therapists.add(u);
            }
        }

        return new ArrayList<>(therapists);
    }

    public Collection<User> findAllTherapistsByExperience(int experience) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));
        Collection<User> therapists = new ArrayList<>();
        List<User> user = userRepository.findAllByRolesIn(roles);
        for (User u : user) {
            if(u.getExperience()==experience){
                therapists.add(u);
            }
        }

        return new ArrayList<>(therapists);
    }

    public Collection<User> findAllTherapistsByLocation(String location) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));
        Collection<User> therapists = new ArrayList<>();
        List<User> user = userRepository.findAllByRolesIn(roles);
        for (User u : user) {
            if(u.getLocation().getLocation().equals(location)){
                therapists.add(u);
            }
        }

        return new ArrayList<>(therapists);
    }

    public Collection<User> findAllTherapistsByLanguage(String language) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));

        Collection<User> therapists = new ArrayList<>();
        List<User> users = userRepository.findAllByRolesIn(roles);

        for (User user : users) {
            if (user.getLanguage() != null &&
                    user.getLanguage().stream()
                            .anyMatch(lang -> lang.getLanguage().equals(language))) {
                therapists.add(user);
            }
        }

        return new ArrayList<>(therapists);
    }


    public Collection<User> findAllTherapistsByGetStarted(int userId) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));

        Collection<User> therapists = new ArrayList<>();
        List<User> theTherapists = userRepository.findAllByRolesIn(roles);

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            for (User therapist : theTherapists) {
                if (therapist.getGender().getGender().equals(user.getQuestionnaire().getTherapistGender().getGender())) {
                    if (therapist.getTherapistInfo().getTherapyType().stream()
                            .anyMatch(type -> type.getTherapyType().equals(user.getQuestionnaire().getTherapyType().getTherapyType()))){
                        if (therapist.getTherapistInfo().getIdentityType().stream()
                                .anyMatch(type -> type.getIdentityType().equals(user.getQuestionnaire().getIdentityType().getIdentityType()))){
                            if (therapist.getTherapistInfo().getTherapistType().stream()
                                    .anyMatch(type -> type.getTherapistType().equals(user.getQuestionnaire().getTherapistType().getTherapistType()))){
                                therapists.add(therapist);
                            }
                        }
                    }
                }
            }
        }

        return new ArrayList<>(therapists);
    }

    public Collection<User> findAllTherapistsByTherapyType(String therapyType) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));

        Collection<User> therapists = new ArrayList<>();
        List<User> users = userRepository.findAllByRolesIn(roles);
        for (User user : users) {
            if (user.getTherapistInfo().getTherapyType() != null &&
                    user.getTherapistInfo().getTherapyType().stream()
                            .anyMatch(type -> type.getTherapyType().equals(therapyType))) {
                therapists.add(user);
            }
        }

        return new ArrayList<>(therapists);
    }

    public Collection<User> findAllTherapistsByIdentityType(String identityType) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));

        Collection<User> therapists = new ArrayList<>();
        List<User> users = userRepository.findAllByRolesIn(roles);
        for (User user : users) {
            if (user.getTherapistInfo().getIdentityType() != null &&
                    user.getTherapistInfo().getIdentityType().stream()
                            .anyMatch(type -> type.getIdentityType().equals(identityType))) {
                therapists.add(user);
            }
        }

        return new ArrayList<>(therapists);
    }

    public Collection<User> findAllTherapistsByTherapistType(String therapistType) {
        Collection<Roles> roles = new ArrayList<>();
        roles.add(roleDao.findRoleByName("ROLE_THERAPIST"));

        Collection<User> therapists = new ArrayList<>();
        List<User> users = userRepository.findAllByRolesIn(roles);
        for (User user : users) {
            if (user.getTherapistInfo().getTherapistType() != null &&
                    user.getTherapistInfo().getTherapistType().stream()
                            .anyMatch(type -> type.getTherapistType().equals(therapistType))) {
                therapists.add(user);
            }
        }

        return new ArrayList<>(therapists);
    }

    public void addNewNote(NoteDto noteDto) {
        List<String> mainPointsList = new ArrayList<>(noteDto.getMainPoints());

        Collection<Point> pointCollection = new ArrayList<>();
        Point savedPoint;
        for (String pointString : mainPointsList){
            Point point = new Point();
            point.setPoint(pointString);
            savedPoint = pointRepository.save(point);
            pointCollection.add(savedPoint);
        }

        MainPoints mainPoints = new MainPoints();
        mainPoints.setPoint(pointCollection);
        mainPointsRepository.save(mainPoints);

        Notes notes = new Notes();
        notes.setNotesText(noteDto.getNotesText());
        notes.setMainPoints(mainPoints);
        notes.setPatientMoodAfter(noteDto.getPatientMoodAfter());
        notes.setPatientMoodBefore(noteDto.getPatientMoodBefore());

        Notes savedNote = noteRepository.save(notes);

        TherapistNotes therapistNotes = new TherapistNotes();
        therapistNotes.setNotes(savedNote);
        therapistNotes.setTherapistId(noteDto.getTherapistId());
        therapistNotes.setClientId(noteDto.getClientId());

        therapistNotesRepository.save(therapistNotes);

        TherapistNotesHistory therapistNotesHistory = new TherapistNotesHistory();
        therapistNotesHistory.setNotes(savedNote);
        therapistNotesHistory.setTherapistId(noteDto.getTherapistId());
        therapistNotesHistory.setClientId(noteDto.getClientId());

        therapistNotesHistoryRepository.save(therapistNotesHistory);
    }

    public Collection<Notes> findAllClientTherapistConnectedNotes(NoteDto noteDto) {
        List<Notes> notes = therapistNotesRepository.findNotesIdByClientIdAndTherapistId(noteDto.getClientId(),noteDto.getTherapistId());

        List<Notes> notesFetched = new ArrayList<>();
        for (Notes note : notes) {
            Optional<Notes> optionalNote = noteRepository.findById(Math.toIntExact(note.getId()));
            if (optionalNote.isPresent()) {
                notesFetched.add(optionalNote.get());
            }
        }

        return notesFetched;
    }

    public Collection<Notes> findAllClientTherapistConnectedNotesHistory(NoteDto noteDto) {
        List<Notes> notes = therapistNotesHistoryRepository.findNotesHistoryIdByClientIdAndTherapistId(noteDto.getClientId(),noteDto.getTherapistId());

        List<Notes> notesFetched = new ArrayList<>();
        for (Notes note : notes) {
            Optional<Notes> optionalNote = noteRepository.findById(Math.toIntExact(note.getId()));
            if (optionalNote.isPresent()) {
                notesFetched.add(optionalNote.get());
            }
        }

        return notesFetched;
    }


    public Collection<TherapistWorkDays> fetchAvailableSlots(TherapistWorkDaysDto therapistWorkDaysDto) {

        return therapistWorkDaysRepository.findAllById(Collections.singleton(therapistWorkDaysDto.getTherapistId()));
    }

    public void selectWorkDays(TherapistWorkDaysDto therapistWorkDaysDto) {
        TherapistWorkDays therapistWorkDays = new TherapistWorkDays();
        therapistWorkDays.setTherapistId(therapistWorkDaysDto.getTherapistId());
        therapistWorkDays.setStartTime(therapistWorkDaysDto.getStartTime());
        therapistWorkDays.setEndTime(therapistWorkDaysDto.getEndTime());
        therapistWorkDays.setWeekdays(therapistWorkDaysDto.getDays());

        therapistWorkDaysRepository.save(therapistWorkDays);
    }
}
