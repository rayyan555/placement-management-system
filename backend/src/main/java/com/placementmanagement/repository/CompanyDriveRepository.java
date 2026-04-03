package com.placementmanagement.repository;

import com.placementmanagement.entity.CompanyDrive;
import com.placementmanagement.entity.enums.DriveStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyDriveRepository extends JpaRepository<CompanyDrive, Long> {

    List<CompanyDrive> findByStatus(DriveStatus status);

}