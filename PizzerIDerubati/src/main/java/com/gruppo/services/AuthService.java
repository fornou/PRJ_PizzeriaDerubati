package com.gruppo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.gruppo.Security.JwtTokenProvider;
import com.gruppo.controllers.LoginRequest;
import com.gruppo.entities.User;
import com.gruppo.entities.UserAuthority;
import com.gruppo.entities.UserAuthorityId;
import com.gruppo.repos.UserDAO;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserDAO userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String authenticateUser(LoginRequest loginRequest) {
        System.out.println("Attempting to authenticate user: " + loginRequest.getUsername());
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("Authentication successful for user: " + loginRequest.getUsername());
            return tokenProvider.generateToken(authentication);
        } catch (Exception e) {
            System.out.println("Authentication failed for user: " + loginRequest.getUsername() + " - " + e.getMessage());
            throw new RuntimeException("Invalid username or password");
        }
    }

    public void createAdminUser() {
        if (!userRepository.findByUsername("admin").isPresent()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("adminpassword"));

            UserAuthority authority = new UserAuthority();
            UserAuthorityId authorityId = new UserAuthorityId();
            authorityId.setUserId(admin.getId());
            authorityId.setAuthority("ROLE_ADMIN");
            authority.setId(authorityId);
            authority.setUser(admin);
            authority.setAuthority("ROLE_ADMIN");

            admin.setAuthorities(Set.of(authority));

            userRepository.save(admin);
        }
    }
}