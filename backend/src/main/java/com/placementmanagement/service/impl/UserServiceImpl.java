
package com.placementmanagement.service.impl;

import com.placementmanagement.dto.ChangePasswordRequest;
import com.placementmanagement.entity.Department;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.User;
import com.placementmanagement.entity.enums.Role;
import com.placementmanagement.repository.DepartmentRepository;
import com.placementmanagement.repository.StudentProfileRepository;
import com.placementmanagement.repository.UserRepository;
import com.placementmanagement.service.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final DepartmentRepository departmentRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Constructor Injection
    public UserServiceImpl(UserRepository repo,
                           DepartmentRepository departmentRepository,
                           StudentProfileRepository studentProfileRepository,
                           PasswordEncoder passwordEncoder) {

        this.repo = repo;
        this.departmentRepository = departmentRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================
    // SAVE USER
    // =========================

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

    // =========================
    // GET USERS
    // =========================

    @Override
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // =========================
    // CHANGE PASSWORD
    // =========================

    @Override
    public void changePassword(Long userId,
                               String oldPassword,
                               String newPassword) {

        User user = repo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        repo.save(user);
    }


    // =========================
    // CREATE USER (FINAL FIX)
    // =========================

    @Override
    public User createUser(String name,
                           String email,
                           String password,
                           String roleStr,
                           Long departmentId) {

        Role role = Role.valueOf(roleStr);

        Department department = null;

        // 🔥 fetch department
        if (departmentId != null) {
            department = departmentRepository.findById(departmentId)
                    .orElseThrow(() -> new RuntimeException("Department not found"));
        }

        // 🔥 validation
        if (role == Role.STUDENT && department == null) {
            throw new RuntimeException("Department is required for student");
        }

        User user = new User();

        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setDepartment(department); // ✅ IMPORTANT

        user = repo.save(user);

        // 🔥 create student profile
        if (role == Role.STUDENT) {

            StudentProfile profile = new StudentProfile();
            profile.setUser(user);
            profile.setDepartment(department);

            studentProfileRepository.save(profile); // ✅ FIXED
        }

        return user;
    }
}