package com.placementmanagement.controller;

import com.placementmanagement.dto.LoginRequest;
import com.placementmanagement.entity.User;
import com.placementmanagement.repository.UserRepository;
import com.placementmanagement.security.JwtUtil;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.repository.StudentProfileRepository;
import com.placementmanagement.entity.enums.Role; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")   // ✅ ONLY ONE
    public Map<String, Object> login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.generateToken(request.getEmail());

        User user = userRepository.findFirstByEmail(request.getEmail()).orElseThrow();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        response.put("userId", user.getId());

        // ✅ ADD THIS BLOCK
        if (user.getRole() == Role.STUDENT) {

            StudentProfile profile = studentProfileRepository
                    .findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Student profile not found"));

            response.put("studentProfileId", profile.getId());
        }

        return response;
    }
}