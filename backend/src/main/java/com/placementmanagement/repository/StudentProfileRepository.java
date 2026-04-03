package com.placementmanagement.repository;

import com.placementmanagement.entity.Department;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.User;
import com.placementmanagement.entity.enums.PlacementStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface StudentProfileRepository
        extends JpaRepository<StudentProfile, Long>, JpaSpecificationExecutor<StudentProfile> {
    Optional<StudentProfile> findByUserId(Long userId);

    Optional<StudentProfile> findByUser(User user);

    Optional<StudentProfile> findByRegisterNo(String registerNo);

    List<StudentProfile> findByDepartment(Department department);

    long countByOverallStatus(PlacementStatus status);
    Optional<StudentProfile> findByUser_Email(String email);
    
}