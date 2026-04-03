package com.placementmanagement.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Service;
import com.placementmanagement.repository.CompanyDriveRepository;
import com.placementmanagement.repository.InterviewFeedbackRepository;
import com.placementmanagement.repository.PlacementDetailsRepository;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.repository.StudentProfileRepository;

import com.placementmanagement.entity.CompanyDrive;
import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.InterviewFeedback;
import com.placementmanagement.entity.PlacementDetails;
import com.placementmanagement.entity.enums.ApplicationStatus;
import com.placementmanagement.repository.DriveStudentStatusRepository;

import com.placementmanagement.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    private final DriveStudentStatusRepository statusRepository;
    private final CompanyDriveRepository driveRepository;
    private final InterviewFeedbackRepository feedbackRepository;
    private final StudentProfileRepository studentRepository;
    @Autowired
private PlacementDetailsRepository placementDetailsRepository;

   public ReportServiceImpl(
        DriveStudentStatusRepository statusRepository,
        CompanyDriveRepository driveRepository,
        InterviewFeedbackRepository feedbackRepository,
        StudentProfileRepository studentRepository) {

    this.statusRepository = statusRepository;
    this.driveRepository = driveRepository;
    this.feedbackRepository = feedbackRepository;
    this.studentRepository = studentRepository;
    this.placementDetailsRepository = placementDetailsRepository;
}



@Override
public Resource generateStudentsReport() {

    try {

        List<StudentProfile> students = studentRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Students");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Sl.No");
        header.createCell(1).setCellValue("Student Name");
        header.createCell(2).setCellValue("Email");
        header.createCell(3).setCellValue("Phone No");
        header.createCell(4).setCellValue("Roll No");
        header.createCell(5).setCellValue("Batch");
        header.createCell(6).setCellValue("Date Of Birth");
        header.createCell(7).setCellValue("City");
        header.createCell(8).setCellValue("Degree");
        header.createCell(9).setCellValue("Department");
        header.createCell(10).setCellValue("College");
        header.createCell(11).setCellValue("Gender");
        header.createCell(12).setCellValue("10th %");
        header.createCell(13).setCellValue("12th %");
        header.createCell(14).setCellValue("Diploma %");
        header.createCell(15).setCellValue("CGPA");
        header.createCell(16).setCellValue("Resume Link");

        int rowIndex = 1;

        for (StudentProfile s : students) {

            Row row = sheet.createRow(rowIndex);

            row.createCell(0).setCellValue(rowIndex);

            row.createCell(1).setCellValue(
                    s.getUser() != null && s.getUser().getName() != null
                            ? s.getUser().getName()
                            : ""
            );

            row.createCell(2).setCellValue(
                    s.getUser() != null && s.getUser().getEmail() != null
                            ? s.getUser().getEmail()
                            : ""
            );

            row.createCell(3).setCellValue(
                    s.getPhoneNumber() != null ? s.getPhoneNumber() : ""
            );

            row.createCell(4).setCellValue(
                    s.getRegisterNo() != null ? s.getRegisterNo() : ""
            );

            // 🔥 FIXED (IMPORTANT)
            row.createCell(5).setCellValue(
                    s.getBatchYear() != null ? s.getBatchYear() : 0
            );

            row.createCell(6).setCellValue(
                    s.getDateOfBirth() != null ? s.getDateOfBirth().toString() : ""
            );

            row.createCell(7).setCellValue(
                    s.getCity() != null ? s.getCity() : ""
            );

            row.createCell(8).setCellValue(
                    s.getDegree() != null ? s.getDegree() : ""
            );

            row.createCell(9).setCellValue(
                    s.getDepartment() != null && s.getDepartment().getName() != null
                            ? s.getDepartment().getName()
                            : ""
            );

            row.createCell(10).setCellValue(
                    s.getCollege() != null ? s.getCollege() : ""
            );

            row.createCell(11).setCellValue(
                    s.getGender() != null ? s.getGender() : ""
            );

            row.createCell(12).setCellValue(
                    s.getTenthPercentage() != null ? s.getTenthPercentage() : 0
            );

            row.createCell(13).setCellValue(
                    s.getTwelfthPercentage() != null ? s.getTwelfthPercentage() : 0
            );

            row.createCell(14).setCellValue(
                    s.getDiplomaPercentage() != null ? s.getDiplomaPercentage() : 0
            );

            row.createCell(15).setCellValue(
                    s.getCgpa() != null ? s.getCgpa() : 0
            );

            row.createCell(16).setCellValue(
                    s.getResumePath() != null ? s.getResumePath() : ""
            );

            rowIndex++;
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Failed to generate student report", e);
    }
}

    @Override
public Resource generateDrivesReport() {

    try {

        List<CompanyDrive> drives = driveRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Drives Report");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Company");
        header.createCell(1).setCellValue("Role");
        header.createCell(2).setCellValue("Package");
        header.createCell(3).setCellValue("Drive Date");
        header.createCell(4).setCellValue("Total Applicants");
        header.createCell(5).setCellValue("Selected Students");

        int rowIndex = 1;

        for (CompanyDrive drive : drives) {

            Row row = sheet.createRow(rowIndex++);

            long totalApplicants =
                    statusRepository.countByDriveId(drive.getId());

            long selectedStudents =
                    statusRepository.countByDriveIdAndStatus(
                            drive.getId(), ApplicationStatus.SELECTED);

            row.createCell(0).setCellValue(drive.getCompanyName());
            row.createCell(1).setCellValue(drive.getRole());
            row.createCell(2).setCellValue(drive.getPackageOffered());
            row.createCell(3).setCellValue(drive.getInterviewDate().toString());
            row.createCell(4).setCellValue(totalApplicants);
            row.createCell(5).setCellValue(selectedStudents);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

        return new InputStreamResource(in);

    } catch (Exception e) {
        throw new RuntimeException("Error generating drives report", e);
    }
}

@Override
public Resource generateFeedbackReport() {

    try {

        List<InterviewFeedback> feedbacks = feedbackRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Feedback Report");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Student Name");
        header.createCell(1).setCellValue("Company");
        header.createCell(2).setCellValue("Rounds");
        header.createCell(3).setCellValue("Questions");
        header.createCell(4).setCellValue("Difficulty");
        header.createCell(5).setCellValue("Experience");
        header.createCell(6).setCellValue("Tips");
        header.createCell(7).setCellValue("Status");

        int rowIndex = 1;

        for (InterviewFeedback feedback : feedbacks) {

            Row row = sheet.createRow(rowIndex++);

            row.createCell(0).setCellValue(
                    feedback.getStudent().getUser().getName()
            );

            row.createCell(1).setCellValue(
                    feedback.getCompanyName()
            );

            row.createCell(2).setCellValue(
                    feedback.getRounds()
            );

            row.createCell(3).setCellValue(
                    feedback.getQuestions()
            );

            row.createCell(4).setCellValue(
                    feedback.getDifficulty()
            );

            row.createCell(5).setCellValue(
                    feedback.getExperience()
            );

            row.createCell(6).setCellValue(
                    feedback.getTips()
            );

            row.createCell(7).setCellValue(
                    feedback.getStatus().name()
            );
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

        return new InputStreamResource(in);

    } catch (Exception e) {
        throw new RuntimeException("Failed to generate feedback report", e);
    }
}

   @Override
public Resource generatePlacementsReport() {

    try {

        List<PlacementDetails> placements = placementDetailsRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Placements");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Student Name");
        header.createCell(1).setCellValue("Register No");
        header.createCell(2).setCellValue("Company");
        header.createCell(3).setCellValue("Package");
        header.createCell(4).setCellValue("Placement Date");
        header.createCell(5).setCellValue("Status");

        int rowNum = 1;

        for (PlacementDetails p : placements) {

            StudentProfile s = p.getStudent();

            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(
                s.getUser() != null ? s.getUser().getName() : ""
            );

            row.createCell(1).setCellValue(s.getRegisterNo());

            row.createCell(2).setCellValue(p.getCompanyName());

            row.createCell(3).setCellValue(
                p.getPackageOffered() != null ? p.getPackageOffered() : 0
            );

            row.createCell(4).setCellValue(
                p.getPlacementDate() != null ? p.getPlacementDate().toString() : ""
            );

            row.createCell(5).setCellValue("PLACED");
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        ByteArrayInputStream inputStream =
                new ByteArrayInputStream(out.toByteArray());

        return new InputStreamResource(inputStream);

    } catch (Exception e) {

        e.printStackTrace();
        throw new RuntimeException("Error generating placement report");

    }
}
}