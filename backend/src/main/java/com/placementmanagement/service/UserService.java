package com.placementmanagement.service;

import com.placementmanagement.dto.ChangePasswordRequest;
import com.placementmanagement.entity.User;
import java.util.List;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    void changePassword(Long userId,
                    String oldPassword,
                    String newPassword);
    // void changePassword(String email, ChangePasswordRequest request);

    User createUser(String name,
                String email,
                String password,
                String roleStr,
                Long departmentId);

}