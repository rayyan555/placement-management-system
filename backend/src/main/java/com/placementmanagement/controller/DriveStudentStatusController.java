




package com.placementmanagement.controller;

import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.enums.ApplicationStatus;
import com.placementmanagement.repository.DriveStudentStatusRepository;
import com.placementmanagement.service.DriveStudentStatusService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drive-status")
@CrossOrigin
public class DriveStudentStatusController {

    private final DriveStudentStatusRepository repository;
    private final DriveStudentStatusService service;

    public DriveStudentStatusController(
            DriveStudentStatusRepository repository,
            DriveStudentStatusService service) {

        this.repository = repository;
        this.service = service;
    }

    // ✅ Coordinator sees all students who applied for a drive
    @GetMapping("/drive/{driveId}")
    public List<DriveStudentStatus> getDriveApplications(
            @PathVariable Long driveId) {

        return repository.findByDrive_Id(driveId);
    }

    // ✅ Student sees their applications
    @GetMapping("/student/{studentId}")
    public List<DriveStudentStatus> getStudentApplications(
            @PathVariable Long studentId) {

        return repository.findByStudent_Id(studentId);
    }

    // ✅ 🔥 MAIN API: Update status (SHORTLISTED / SELECTED / REJECTED / APPLIED)
    @PutMapping("/update")
    public String updateStatus(
            @RequestParam Long studentId,
            @RequestParam Long driveId,
            @RequestParam ApplicationStatus status) {

        service.updateStatus(studentId, driveId, status);

        return "Status updated successfully";
    }

    @GetMapping("/all")
public List<DriveStudentStatus> getAllApplications() {
    return repository.findAll();
}
}