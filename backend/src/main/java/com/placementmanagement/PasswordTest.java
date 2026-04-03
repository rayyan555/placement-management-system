package com.placementmanagement;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordTest {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String hashed = encoder.encode("default123");

        System.out.println("BCrypt Password: " + hashed);
    }
}