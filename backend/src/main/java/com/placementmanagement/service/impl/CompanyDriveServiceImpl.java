package com.placementmanagement.service.impl;

import com.placementmanagement.entity.CompanyDrive;
import com.placementmanagement.entity.enums.DriveStatus;
import com.placementmanagement.repository.CompanyDriveRepository;
import com.placementmanagement.service.CompanyDriveService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyDriveServiceImpl implements CompanyDriveService {

    private final CompanyDriveRepository repository;

    public CompanyDriveServiceImpl(CompanyDriveRepository repository) {
        this.repository = repository;
    }

    @Override
    public CompanyDrive createDrive(CompanyDrive drive) {
        return repository.save(drive);
    }

    @Override
    public List<CompanyDrive> getAllDrives() {
        return repository.findAll();
    }

    @Override
    public CompanyDrive getDriveById(Long id) {
        return repository.findById(id).orElse(null);
    }
@Override
public CompanyDrive updateDrive(Long id, CompanyDrive updatedDrive) {

    CompanyDrive existing = repository.findById(id).orElse(null);

    if (existing != null) {

        existing.setCompanyName(updatedDrive.getCompanyName());
        existing.setRole(updatedDrive.getRole());
        existing.setPackageOffered(updatedDrive.getPackageOffered());

        existing.setMinTenth(updatedDrive.getMinTenth());
        existing.setMinTwelfth(updatedDrive.getMinTwelfth());
        existing.setMinCgpa(updatedDrive.getMinCgpa());
        existing.setMaxBacklogs(updatedDrive.getMaxBacklogs());

        existing.setInterviewDate(updatedDrive.getInterviewDate());
        existing.setLocation(updatedDrive.getLocation());

        existing.setStatus(updatedDrive.getStatus());
        existing.setAllowedDepartments(updatedDrive.getAllowedDepartments());

        // 🔥 ADD THIS LINE
        existing.setApplicationLink(updatedDrive.getApplicationLink());

        return repository.save(existing);
    }

    return null;
}

    @Override
    public void deleteDrive(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<CompanyDrive> getDrivesByStatus(DriveStatus status) {
        return repository.findByStatus(status);
    }
}