package com.placementmanagement.service;

import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.enums.ApplicationStatus;

import java.util.List;

public interface DriveStudentStatusService {

    List<DriveStudentStatus> getApplicationsByDrive(Long driveId);

    void updateStatus(Long studentId,
                      Long driveId,
                      ApplicationStatus status);
}