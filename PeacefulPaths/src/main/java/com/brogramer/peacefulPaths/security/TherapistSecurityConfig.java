package com.brogramer.peacefulPaths.security;

import com.brogramer.peacefulPaths.config.JWTAuthenticationFilter;
import com.brogramer.peacefulPaths.config.UserAuthenticationEntryPoint;
import com.brogramer.peacefulPaths.config.UserAuthenticationProvider;
import com.brogramer.peacefulPaths.service.TherapistService;
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

//    @Autowired
//    private JWTTokenHelper jWTTokenHelper;

//    @Bean
//    public AuthenticationFailureHandler authenticationFailureHandler() {
//        return (request, response, exception) -> {
//            System.out.println("Login failed: " + exception.getMessage());
//            request.getSession().setAttribute("error", "Invalid credentials!");
//
//            response.sendRedirect("/peacefulPaths/login");
//        };
//    }

//    private String determineTargetUrl(Authentication authentication) {
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//
////        if (authorities.stream().anyMatch(authority -> "ROLE_MANAGER".equals(authority.getAuthority()))) {
////            return "/peacefulPaths/account";
////        } else {
//            return "/peacefulPaths/account";
////        }
//    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(TherapistService userService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//
//        http.authorizeHttpRequests(configurer ->
//                        configurer
//                                .requestMatchers("/api/auth/login").permitAll()
//                                .requestMatchers("peacefulPaths/getUsers").hasRole("MANAGER")
//                                .requestMatchers("/peacefulPaths/account").hasRole("USER")
//                                .anyRequest().authenticated());
//
////                .formLogin(form -> form.loginPage("/peacefulPaths/login")
////                        .loginProcessingUrl("/authenticateTheUser")
////                        .usernameParameter("email")
////                        .successHandler((request, response, authentication) -> {
////                            request.getSession().setAttribute("success", true);
////                            request.getSession().setAttribute("email", authentication.getName());
////                            String targetUrl = determineTargetUrl(authentication);
////                            response.sendRedirect(targetUrl);
////                        })
////                        .failureHandler(authenticationFailureHandler()).permitAll())
////                .logout(logout -> logout.logoutSuccessUrl("/peacefulPaths/home").permitAll());
////                .exceptionHandling(configurer->
////                        configurer.accessDeniedPage("/peacefulPaths/login"));
//
//
//        return http.build();
//    }

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
                        .requestMatchers(HttpMethod.POST, "/api/auth/login","/api/auth/register","api/auth/sendEmail").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/api/auth/update").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/auth/resetPassword").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/userinfo").hasAnyRole("USER","THERAPIST","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/auth/allUserinfo").hasAnyRole("ADMIN","THERAPIST")
                        .requestMatchers(HttpMethod.GET, "/api/auth/userinfoId/{id}").hasAnyRole("ADMIN","THERAPIST","USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/deleteUser").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/auth/userTherapistConnection").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/auth/fetchUserTherapistConnectionData/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/removeTherapist/{id}").hasRole("USER")
                        .anyRequest().authenticated());


        return http.build();
    }

}
