package com.placementmanagement.controller;

import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.enums.ApplicationStatus;
import com.placementmanagement.service.DriveStudentStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coordinator/drives")
public class CoordinatorDriveController {

    @Autowired
    private DriveStudentStatusService service;

    // 1️⃣ View all applications of a drive
    @GetMapping("/{driveId}/applications")
    public List<DriveStudentStatus> 
        getApplications(@PathVariable Long driveId) {

        return service.getApplicationsByDrive(driveId);
    }

    // 2️⃣ Update application status
    @PutMapping("/{driveId}/students/{studentId}")
    public String updateStatus(
            @PathVariable Long driveId,
            @PathVariable Long studentId,
            @RequestParam ApplicationStatus status) {

        service.updateStatus(studentId, driveId, status);

        return "Status updated successfully";
    }
}