package com.placementmanagement.service.impl;
import com.placementmanagement.entity.PlacementDetails;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.enums.PlacementStatus;
import com.placementmanagement.repository.PlacementDetailsRepository;
import com.placementmanagement.repository.StudentProfileRepository;
import java.time.LocalDate;
import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.enums.ApplicationStatus;
import com.placementmanagement.repository.DriveStudentStatusRepository;
import com.placementmanagement.service.DriveStudentStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriveStudentStatusServiceImpl
        implements DriveStudentStatusService {

    @Autowired
    private DriveStudentStatusRepository repository;

    @Override
    public List<DriveStudentStatus> 
        getApplicationsByDrive(Long driveId) {

        return repository.findByDrive_Id(driveId);
    }

    @Autowired
private PlacementDetailsRepository placementRepository;

@Autowired
private StudentProfileRepository studentRepository;
@Override
public void updateStatus(Long studentId,
                         Long driveId,
                         ApplicationStatus status) {

    DriveStudentStatus application =
            repository.findByStudent_IdAndDrive_Id(studentId, driveId)
                    .orElseThrow(() ->
                            new RuntimeException("Application not found"));

    application.setStatus(status);
    repository.save(application);



if (status == ApplicationStatus.SELECTED) {

    StudentProfile student = application.getStudent();

    // ✅ Prevent duplicate placement (safe version)
    if (student.getOverallStatus() == PlacementStatus.PLACED) {
        return;
    }

    student.setOverallStatus(PlacementStatus.PLACED);
    studentRepository.save(student);

    PlacementDetails placement = new PlacementDetails();
    placement.setStudent(student);
    placement.setCompanyName(application.getDrive().getCompanyName());
    placement.setPackageOffered(
        application.getDrive().getPackageOffered()
    );
    placement.setPlacementDate(LocalDate.now());

    placementRepository.save(placement);
}
}
}