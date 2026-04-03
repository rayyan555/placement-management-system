package com.placementmanagement.service;

import com.placementmanagement.entity.CompanyDrive;
import com.placementmanagement.entity.enums.DriveStatus;

import java.util.List;

public interface CompanyDriveService {

    CompanyDrive createDrive(CompanyDrive drive);

    List<CompanyDrive> getAllDrives();

    CompanyDrive getDriveById(Long id);

    CompanyDrive updateDrive(Long id, CompanyDrive drive);

    void deleteDrive(Long id);

    List<CompanyDrive> getDrivesByStatus(DriveStatus status);
}