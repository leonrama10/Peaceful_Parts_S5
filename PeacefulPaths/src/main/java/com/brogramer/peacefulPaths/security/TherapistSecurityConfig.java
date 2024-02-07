package com.brogramer.peacefulPaths.security;

import com.brogramer.peacefulPaths.service.TherapistService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.util.Collection;

@Configuration
public class TherapistSecurityConfig {

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            System.out.println("Login failed: " + exception.getMessage());
            request.getSession().setAttribute("error", "Invalid credentials!");

            response.sendRedirect("/peacefulPaths/login");
        };
    }

    private String determineTargetUrl(Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

//        if (authorities.stream().anyMatch(authority -> "ROLE_MANAGER".equals(authority.getAuthority()))) {
//            return "/peacefulPaths/account";
//        } else {
            return "/peacefulPaths/account";
//        }
    }

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

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers("/peacefulPaths/home","/peacefulPaths/login","/peacefulPaths/register","/peacefulPaths/resetPassword","/peacefulPaths/forgotPassword","/peacefulPaths/sendEmail","/peacefulPaths/getStarted").permitAll()
                                .requestMatchers("/peacefulPaths/users").hasRole("MANAGER")
                                .requestMatchers("/peacefulPaths/showFormForUpdate/**").hasRole("MANAGER")
                                .requestMatchers("/peacefulPaths/showFormForAdd/**").hasRole("MANAGER")
                                .requestMatchers("/peacefulPaths/account").hasRole("USER")
                                .anyRequest().authenticated())
                .formLogin(form -> form.loginPage("/peacefulPaths/login")
                        .loginProcessingUrl("/authenticateTheUser")
                        .usernameParameter("email")
                        .successHandler((request, response, authentication) -> {
                            request.getSession().setAttribute("success", true);
                            request.getSession().setAttribute("email", authentication.getName());
                            String targetUrl = determineTargetUrl(authentication);
                            response.sendRedirect(targetUrl);
                        })
                        .failureHandler(authenticationFailureHandler()).permitAll())
                .logout(logout -> logout.logoutSuccessUrl("/peacefulPaths/home").permitAll());
//                .exceptionHandling(configurer->
//                        configurer.accessDeniedPage("/peacefulPaths/login"));


        return http.build();
    }

}
