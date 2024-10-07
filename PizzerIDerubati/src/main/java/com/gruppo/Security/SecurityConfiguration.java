package com.gruppo.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gruppo.services.AuthenticationErrorHandler;
import com.gruppo.services.CustomUserDetailsService;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final CustomUserDetailsService userDetailsService;
    private final CustomJwtFilter customJwtFilter;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfiguration(CustomUserDetailsService userDetailsService, CustomJwtFilter customJwtFilter, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.customJwtFilter = customJwtFilter;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                .requestMatchers("/", 
                                "/home", 
                                "/bevanda",
                                "/calzone",
                                "/carrello",
                                "/dolce",
                                "/focaccia",
                                "/menu",
                                "/pizza",
                                "/api/auth/login", 
                                "/css/**", 
                                "/js/**",
                                "api/pizze","api/bevande","api/dolci","api/calzoni","api/focaccia",
                                "api/pizze/codice/{id}","api/pizze/tipi","api/pizze/tipo/{tipo}",
                                "api/ingredienti",
                                "api/proj/ingredienti",
                                "api/proj/pizze","/api/proj/bevande","api/proj/dolci","api/proj/calzoni","api/proj/focaccia",
                                "api/proj/pizze/codice/{id}","api/proj/pizze/tipi","api/proj/pizze/tipo/{tipo}",
                                "/img/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/ordini").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/ordini").hasAnyRole("ADMIN","USER")
                .requestMatchers("api/proj/ordini","/ordini","api/ordini/stato/aggiorna/{id}","api/ordini/stato/{stato}").hasAnyRole("ADMIN", "USER")
                .anyRequest().authenticated()
            )
            .formLogin(formLogin -> formLogin
                .loginPage("/login")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true)
                .deleteCookies("token")
                .permitAll()
            )
            .addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class)
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint((request, response, authException) -> {
                try {
                    AuthenticationErrorHandler.handleAuthenticationError(request, response, authException);
                } catch (IOException | ServletException e) {
                    e.printStackTrace();
                }
            }));

        return http.build();
    }

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}