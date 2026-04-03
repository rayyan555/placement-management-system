package com.placementmanagement.controller;

import com.placementmanagement.dto.PlacementAnalyticsDTO;
import com.placementmanagement.entity.PlacementDetails;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.User;
import com.placementmanagement.repository.PlacementDetailsRepository;
import com.placementmanagement.service.CoordinatorService;

import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/coordinators")
public class CoordinatorController {

    private final CoordinatorService coordinatorService;

    public CoordinatorController(CoordinatorService coordinatorService) {
        this.coordinatorService = coordinatorService;
    }

    // Assign Department Coordinator
    @PostMapping("/assign")
    public User assignCoordinator(
            @RequestParam Long userId,
            @RequestParam Long departmentId) {

        return coordinatorService.assignDepartmentCoordinator(userId, departmentId);
    }

    @PostMapping("/upload/students")
    public String uploadStudentsExcel(@RequestParam("file") MultipartFile file) {

        coordinatorService.uploadStudentsExcel(file);

        return "Students uploaded successfully";
    }

    // Get all department coordinators
    @GetMapping
    public List<User> getAllCoordinators() {
        return coordinatorService.getAllDepartmentCoordinators();
    }

    @GetMapping("/students/filter")
    public List<StudentProfile> filterStudents(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Double cgpa,
            @RequestParam(required = false) Double tenth,
            @RequestParam(required = false) Double twelfth,
            @RequestParam(required = false) Integer backlogs,
            @RequestParam(required = false) Integer batch) {

        return coordinatorService.filterStudents(
                department, cgpa, tenth, twelfth, backlogs, batch);
    }


    // Remove coordinator
    @DeleteMapping("/{userId}")
    public User removeCoordinator(@PathVariable Long userId) {
        return coordinatorService.removeDepartmentCoordinator(userId);
    }


    @GetMapping("/analytics")
    public PlacementAnalyticsDTO getAnalytics() {
        return coordinatorService.getPlacementAnalytics();
    }
}