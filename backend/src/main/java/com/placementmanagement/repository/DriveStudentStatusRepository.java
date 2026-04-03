package com.placementmanagement.repository;

import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.enums.ApplicationStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DriveStudentStatusRepository
        extends JpaRepository<DriveStudentStatus, Long> {

    // Get all applications for a drive
    List<DriveStudentStatus> findByDrive_Id(Long driveId);

    // Find specific student's application in a drive
    Optional<DriveStudentStatus> 
        findByStudent_IdAndDrive_Id(Long studentId, Long driveId);

        long countByStudent_Id(Long studentId);

long countByStudent_IdAndStatus(
        Long studentId, ApplicationStatus status);

List<DriveStudentStatus> findByStudent_IdAndStatus(
        Long studentId, ApplicationStatus status);

List<DriveStudentStatus> findByStatus(ApplicationStatus status);

long countByDriveId(Long driveId);

long countByDriveIdAndStatus(Long driveId, ApplicationStatus status);
List<DriveStudentStatus> findByStudent_Id(Long studentId);

List<DriveStudentStatus> findAll();

        
}