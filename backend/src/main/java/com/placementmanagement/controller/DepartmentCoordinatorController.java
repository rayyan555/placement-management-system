package com.placementmanagement.controller;

import com.placementmanagement.dto.DepartmentAnalyticsDTO;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.service.DepartmentCoordinatorService;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


import java.io.ByteArrayInputStream;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;


import com.placementmanagement.dto.DepartmentAnalyticsDTO;

@RestController
//@RequestMapping("/api/department-coordinator")
@RequestMapping("/api/department")
public class DepartmentCoordinatorController {

    private final DepartmentCoordinatorService departmentCoordinatorService;

    public DepartmentCoordinatorController(
            DepartmentCoordinatorService departmentCoordinatorService) {
        this.departmentCoordinatorService = departmentCoordinatorService;
    }

    // View students of coordinator's department
    @GetMapping("/students")
    public List<StudentProfile> getDepartmentStudents(
            @RequestParam Long coordinatorId) {

        return departmentCoordinatorService
                .getStudentsByDepartment(coordinatorId);
    }

    // Update student details
    @PutMapping("/students/{studentId}")
    public StudentProfile updateStudentDetails(
            @PathVariable Long studentId,
            @RequestBody StudentProfile updatedStudent) {

        return departmentCoordinatorService
                .updateStudentDetails(studentId, updatedStudent);
    }

    @PostMapping("/upload/students")
public String uploadDepartmentStudents(
        @RequestParam Long coordinatorId,
        @RequestParam("file") MultipartFile file) {

    departmentCoordinatorService.uploadDepartmentStudents(coordinatorId, file);

    return "Department students uploaded successfully";
}

@GetMapping("/reports/students")
public ResponseEntity<InputStreamResource> downloadDepartmentStudentsReport(
        @RequestParam Long coordinatorId) {

    ByteArrayInputStream in =
            departmentCoordinatorService.downloadDepartmentStudentsReport(coordinatorId);

    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Disposition",
            "attachment; filename=department_students_report.xlsx");

    return ResponseEntity
            .ok()
            .headers(headers)
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(new InputStreamResource(in));
}

@GetMapping("/students/filter")
public List<StudentProfile> filterDepartmentStudents(
        @RequestParam Long coordinatorId,
        @RequestParam(required = false) Double cgpa,
        @RequestParam(required = false) Double tenth,
        @RequestParam(required = false) Double twelfth,
        @RequestParam(required = false) Integer backlogs,
        @RequestParam(required = false) Integer batch) {

    return departmentCoordinatorService.filterDepartmentStudents(
            coordinatorId, cgpa, tenth, twelfth, backlogs, batch);
}

@GetMapping("/analytics")
public DepartmentAnalyticsDTO getDepartmentAnalytics(
        @RequestParam Long coordinatorId) {

    return departmentCoordinatorService
            .getDepartmentAnalytics(coordinatorId);
}


@GetMapping("/reports/placements")
public ResponseEntity<InputStreamResource> downloadDepartmentPlacementsReport(
        @RequestParam Long coordinatorId) {

    ByteArrayInputStream in =
            departmentCoordinatorService.downloadDepartmentPlacementsReport(coordinatorId);

    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Disposition",
            "attachment; filename=department_placements_report.xlsx");

    return ResponseEntity
            .ok()
            .headers(headers)
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(new InputStreamResource(in));
}
}