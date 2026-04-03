package com.placementmanagement.controller;

import com.placementmanagement.entity.User;
import com.placementmanagement.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import com.placementmanagement.dto.ChangePasswordRequest;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    

    @GetMapping
    public List<User> getAll() {
        return service.getAllUsers();
    }


    @PutMapping("/change-password")
public String changePassword(
        @RequestBody ChangePasswordRequest request) {

    service.changePassword(
            request.getUserId(),
            request.getOldPassword(),
            request.getNewPassword()
    );

    return "Password changed successfully";
}



@PostMapping
public User createUser(@RequestBody Map<String, Object> request) {

    String name = (String) request.get("name");
    String email = (String) request.get("email");
    String password = (String) request.get("password");
    String roleStr = (String) request.get("role");

    Long departmentId = null;

    if (request.get("departmentId") != null) {
        departmentId = Long.valueOf(request.get("departmentId").toString());
    }

    return service.createUser(name, email, password, roleStr, departmentId);
}
}