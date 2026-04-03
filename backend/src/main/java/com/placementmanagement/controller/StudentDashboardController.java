


package com.placementmanagement.controller;

import com.placementmanagement.dto.StudentDashboardSummary;
import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.PlacementDetails;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.enums.ApplicationStatus;
import com.placementmanagement.repository.DriveStudentStatusRepository;
import com.placementmanagement.repository.PlacementDetailsRepository;
import com.placementmanagement.repository.StudentProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/student-dashboard")
@CrossOrigin
public class StudentDashboardController {

    private final DriveStudentStatusRepository driveRepository;
    private final StudentProfileRepository studentRepository;
    private final PlacementDetailsRepository placementRepository;

    public StudentDashboardController(
            DriveStudentStatusRepository driveRepository,
            StudentProfileRepository studentRepository,
            PlacementDetailsRepository placementRepository) {

        this.driveRepository = driveRepository;
        this.studentRepository = studentRepository;
        this.placementRepository = placementRepository;
    }

    @GetMapping("/{studentId}/summary")
    public StudentDashboardSummary getDashboardSummary(
            @PathVariable Long studentId) {

        StudentDashboardSummary summary = new StudentDashboardSummary();

        // ✅ Get StudentProfile using USER ID
        StudentProfile student =
                studentRepository.findByUserId(studentId)
                        .orElse(null);

        // 🔥 HANDLE NULL FIRST (IMPORTANT)
        if (student == null) {
            summary.setStudentName("Student");
            summary.setAppliedCount(0);
            summary.setShortlistedCount(0);
            summary.setSelectedCount(0);
            summary.setPlacementStatus("NOT_PLACED");
            summary.setUpcomingInterviews(new ArrayList<>());
            return summary;
        }

        // ✅ NOW safe to use
        Long sid = student.getId();

        // ✅ Student Name
        summary.setStudentName(student.getUser().getName());

        // ✅ Counts
        summary.setAppliedCount(
                driveRepository.countByStudent_Id(sid));

        summary.setShortlistedCount(
                driveRepository.countByStudent_IdAndStatus(
                        sid, ApplicationStatus.SHORTLISTED));

        summary.setSelectedCount(
                driveRepository.countByStudent_IdAndStatus(
                        sid, ApplicationStatus.SELECTED));

        // ✅ Placement Status
        if (student.getOverallStatus() != null) {
            summary.setPlacementStatus(
                    student.getOverallStatus().name());
        } else {
            summary.setPlacementStatus("NOT_PLACED");
        }

        // ✅ Placement Details
        PlacementDetails placement =
                placementRepository.findByStudent_Id(sid);

        if (placement != null) {
            StudentDashboardSummary.PlacementInfo info =
                    new StudentDashboardSummary.PlacementInfo();

            info.setCompany(placement.getCompanyName());
            info.setPackageOffered(placement.getPackageOffered());
            info.setPlacementDate(placement.getPlacementDate());

            summary.setPlacementDetails(info);
        }

        // ✅ Upcoming Interviews
        List<DriveStudentStatus> shortlistedDrives =
                driveRepository.findByStudent_IdAndStatus(
                        sid, ApplicationStatus.SHORTLISTED);

        List<StudentDashboardSummary.InterviewInfo> interviews =
                shortlistedDrives.stream()
                        .map(d -> {
                            StudentDashboardSummary.InterviewInfo i =
                                    new StudentDashboardSummary.InterviewInfo();

                            i.setCompanyName(d.getDrive().getCompanyName());
                            i.setRole(d.getDrive().getRole());
                            i.setInterviewDate(d.getDrive().getInterviewDate());
                            i.setLocation(d.getDrive().getLocation());

                            return i;
                        })
                        .toList();

        summary.setUpcomingInterviews(interviews);

        return summary;
    }
}