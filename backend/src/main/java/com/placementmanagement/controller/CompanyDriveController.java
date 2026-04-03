package com.placementmanagement.controller;

import com.placementmanagement.entity.CompanyDrive;
import com.placementmanagement.entity.enums.DriveStatus;
import com.placementmanagement.service.CompanyDriveService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
@CrossOrigin
public class CompanyDriveController {

    private final CompanyDriveService service;

    public CompanyDriveController(CompanyDriveService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public CompanyDrive createDrive(@RequestBody CompanyDrive drive) {
        return service.createDrive(drive);
    }

    // Get All
    @GetMapping
    public List<CompanyDrive> getAllDrives() {
        return service.getAllDrives();
    }

    // Get By ID
    @GetMapping("/{id}")
    public CompanyDrive getDrive(@PathVariable Long id) {
        return service.getDriveById(id);
    }

    // Update
    @PutMapping("/{id}")
    public CompanyDrive updateDrive(@PathVariable Long id,
                                     @RequestBody CompanyDrive drive) {
        return service.updateDrive(id, drive);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteDrive(@PathVariable Long id) {
        service.deleteDrive(id);
        return "Drive Deleted Successfully";
    }

    // Get By Status
    @GetMapping("/status/{status}")
    public List<CompanyDrive> getByStatus(@PathVariable DriveStatus status) {
        return service.getDrivesByStatus(status);
    }
}