package com.gruppo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.gruppo.services.AuthService;

@SpringBootApplication
public class PizzeraIDerubatiApplication implements CommandLineRunner {

    @Autowired
    private AuthService authService;

    public static void main(String[] args) {
        SpringApplication.run(PizzeraIDerubatiApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        authService.createAdminUser();
    }
}