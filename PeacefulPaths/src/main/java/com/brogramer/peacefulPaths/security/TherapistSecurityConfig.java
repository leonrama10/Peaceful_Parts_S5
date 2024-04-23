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
                        .requestMatchers(HttpMethod.PUT,"/api/auth/update","/api/auth/resetPassword").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/userinfo","/api/auth/userinfoId/{id}").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/allUserinfo").hasAnyRole("ADMIN","THERAPIST")
                        .requestMatchers(HttpMethod.GET, "/api/auth/userinfoId/{id}").hasAnyRole("ADMIN","THERAPIST","USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/deleteUser").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/auth/userTherapistConnection").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/api/auth/registerTherapist").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/fetchUserTherapistConnectionData/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/deleteUser/{id}").hasAnyRole("ADMIN","THERAPIST")
                        .requestMatchers(HttpMethod.GET, "/api/auth/allAdminInfo").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/allTherapistInfo").hasAnyRole("ADMIN","USER")
                        .requestMatchers(HttpMethod.POST, "/api/auth/userTherapistConnection","/api/auth/therapistFilterByGenderNotConnected","/api/auth/therapistFilterByExperienceNotConnected","/api/auth/therapistFilterByLocationNotConnected").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/auth/fetchUserTherapistConnectionData/{id}","/api/auth/therapistFilterByGender/{gender}","/api/auth/therapistFilterByExperience/{experience}","/api/auth/therapistFilterByLocation/{location}","/api/auth/fetchAllTherapistNotConnectedData/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/removeTherapist/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.GET,"/api/auth/fetchAllUsersConnectedDataHistory/{id}","/api/auth/fetchAllUsersConnectedData/{id}").hasRole("THERAPIST")
                        .anyRequest().authenticated());


        return http.build();
    }

}
