package com.brogramer.peacefulPaths.security;

import com.brogramer.peacefulPaths.config.JWTAuthenticationFilter;
import com.brogramer.peacefulPaths.config.UserAuthenticationEntryPoint;
import com.brogramer.peacefulPaths.config.UserAuthenticationProvider;
import com.brogramer.peacefulPaths.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class TherapistSecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserService userService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Lazy
    public TherapistSecurityConfig(UserAuthenticationEntryPoint userAuthenticationEntryPoint, UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationEntryPoint = userAuthenticationEntryPoint;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling(e -> e.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new JWTAuthenticationFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers(HttpMethod.POST, "/api/auth/login","/api/auth/register","/api/auth/sendEmail","/api/auth/questionnaireAnswers").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/api/auth/update","/api/auth/resetPassword", "/api/auth/updateBookingSession").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/userinfo").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/auth/userinfoId").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/allUserinfo").hasAnyRole("ADMIN","THERAPIST")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/deleteUser").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/api/auth/deleteNote/{id}").hasRole("THERAPIST")
                        .requestMatchers(HttpMethod.POST, "/api/auth/addNewNote","/api/auth/fetchOldNotesHistory","/api/auth/fetchOldNotes","/api/auth/sendAdviceToUser","/api/auth/fetchFeedback").hasRole("THERAPIST")
                        .requestMatchers(HttpMethod.POST, "/api/auth/fetchUserTherapistChats","/api/auth/sendMessage","/api/auth/fetchNextBooking").hasAnyRole("THERAPIST","USER")
                        .requestMatchers(HttpMethod.POST, "/api/auth/fetchWorkHours","/api/auth/fetchAllUsersConnectedData","/api/auth/fetchAllUsersConnectedDataHistory","/api/auth/selectWorkDays").hasAnyRole("THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/auth/fetchWorkDays","/api/auth/fetchBookingByBookingId", "/api/auth/fetchBookedHoursInEdit").hasAnyRole("THERAPIST","USER","ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/auth/registerTherapist", "/api/auth/registerAdmin","/api/auth/fetchBookingsHistory").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/auth/fetchBookings","/api/auth/fetchAllUserTherapistOldConnectionData", "/api/auth/fetchUserTherapistConnectionData").hasAnyRole("ADMIN","USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/deleteUser/{id}").hasAnyRole("ADMIN","THERAPIST")
                        .requestMatchers(HttpMethod.DELETE,"/api/auth/cancelBooking").hasAnyRole("ADMIN","USER")
                        .requestMatchers(HttpMethod.GET, "/api/auth/allAdminInfo").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/allTherapistInfo").hasAnyRole("ADMIN","USER")
                        .requestMatchers(HttpMethod.POST,"/api/auth/userTherapistConnection","/api/auth/therapistFilterByGenderNotConnected","/api/auth/therapistFilterByExperienceNotConnected","/api/auth/therapistFilterByLocationNotConnected","/api/auth/therapistFilterByLanguageNotConnected","/api/auth/therapistFilterByLanguage","/api/auth/therapistFilterByGetStarted","/api/auth/therapistFilterByGetStartedNotConnectedData","/api/auth/fetchAllTherapistNotConnectedData","/api/auth/therapistFilterByLocation","/api/auth/therapistFilterByExperience","/api/auth/therapistFilterByGender","/api/auth/therapistFilterByTherapistTypeNotConnected","/api/auth/therapistFilterByTherapistType","/api/auth/therapistFilterByTherapyTypeNotConnected","/api/auth/therapistFilterByTherapyType","/api/auth/therapistFilterByIdentityTypeNotConnected","/api/auth/therapistFilterByIdentityType","/api/auth/fetchAvailableSlots","/api/auth/bookSession","/api/auth/fetchAdviceForUser","/api/auth/fetchConnectionsAmount").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/removeTherapist/{id}").hasRole("USER")
                        .anyRequest().authenticated());
        return http.build();
    }

}
