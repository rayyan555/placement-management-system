package com.placementmanagement.service.impl;

import com.placementmanagement.dto.DepartmentAnalyticsDTO;
import com.placementmanagement.entity.Department;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.User;
import com.placementmanagement.entity.enums.PlacementStatus;
import com.placementmanagement.repository.StudentProfileRepository;
import com.placementmanagement.repository.UserRepository;
import com.placementmanagement.entity.enums.Role;
import com.placementmanagement.service.DepartmentCoordinatorService;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import com.placementmanagement.dto.DepartmentAnalyticsDTO;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentCoordinatorServiceImpl implements DepartmentCoordinatorService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DepartmentCoordinatorServiceImpl(
            StudentProfileRepository studentProfileRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔹 Get students of coordinator's department
    @Override
    public List<StudentProfile> getStudentsByDepartment(Long coordinatorId) {

        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() -> new RuntimeException("Coordinator not found"));

        Department department = coordinator.getDepartment();

        return studentProfileRepository.findByDepartment(department);
    }

    
    @Override
public StudentProfile updateStudentDetails(Long studentId, StudentProfile updatedStudent) {

    StudentProfile student = studentProfileRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    student.setCgpa(updatedStudent.getCgpa());

    student.setTenthPercentage(updatedStudent.getTenthPercentage());

    student.setTwelfthPercentage(updatedStudent.getTwelfthPercentage());

    student.setBacklogs(updatedStudent.getBacklogs());
    
    student.setOverallStatus(updatedStudent.getOverallStatus());
    

    return studentProfileRepository.save(student);
}

    
    @Override
public void uploadDepartmentStudents(Long coordinatorId, MultipartFile file) {

    try {

        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() -> new RuntimeException("Coordinator not found"));

        Department department = coordinator.getDepartment();

        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {

            Row row = sheet.getRow(i);
            if (row == null) continue;

            String registerNo = getCellValue(row.getCell(0));
            String name = getCellValue(row.getCell(1));
            String email = getCellValue(row.getCell(2));
            String phone = getCellValue(row.getCell(3));
            String gender = getCellValue(row.getCell(4));
            String city = getCellValue(row.getCell(5));
            String degree = getCellValue(row.getCell(6));
            String college = getCellValue(row.getCell(7));

            Integer batchYear = parseInteger(row.getCell(8));
            Double tenth = parseDouble(row.getCell(9));
            Double twelfth = parseDouble(row.getCell(10));
            Double cgpa = parseDouble(row.getCell(11));
            Integer backlogs = parseInteger(row.getCell(12));

            // 🔥 Skip invalid rows
            if (email == null || email.isEmpty()) continue;

            // =========================
            // ✅ USER HANDLING
            // =========================

            Optional<User> userOptional = userRepository.findFirstByEmail(email);
            User user;

            if (userOptional.isPresent()) {

                user = userOptional.get();

                // 🔥 FIX: Always sync department
                user.setDepartment(department);

            } else {

                user = new User();
                user.setName(name);
                user.setEmail(email);
                user.setPassword(passwordEncoder.encode("default123"));
                user.setRole(Role.STUDENT);
                user.setDepartment(department); // 🔥 IMPORTANT

                user = userRepository.save(user);
            }

            // =========================
            // ✅ PROFILE HANDLING
            // =========================

            Optional<StudentProfile> profileOptional =
                    studentProfileRepository.findByUser(user);

            StudentProfile student;

            if (profileOptional.isPresent()) {

                student = profileOptional.get();

            } else {

                student = new StudentProfile();
                student.setUser(user);
            }

            // 🔥 Always sync department
            student.setDepartment(department);

            // =========================
            // ✅ SET DATA
            // =========================

            student.setRegisterNo(registerNo);
            student.setPhoneNumber(phone);
            student.setGender(gender);
            student.setCity(city);
            student.setDegree(degree);
            student.setCollege(college);
            student.setBatchYear(batchYear);
            student.setTenthPercentage(tenth);
            student.setTwelfthPercentage(twelfth);
            student.setCgpa(cgpa);
            student.setBacklogs(backlogs);

            studentProfileRepository.save(student);
        }

        workbook.close();

    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Error uploading department students: " + e.getMessage());
    }
}

    @Override
    public List<StudentProfile> filterDepartmentStudents(
            Long coordinatorId,
            Double cgpa,
            Double tenth,
            Double twelfth,
            Integer backlogs,
            Integer batch) {

        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() -> new RuntimeException("Coordinator not found"));

        Department department = coordinator.getDepartment();

        List<StudentProfile> students = studentProfileRepository.findByDepartment(department);

        return students.stream()

                .filter(s -> cgpa == null ||
                        (s.getCgpa() != null && s.getCgpa() >= cgpa))

                .filter(s -> tenth == null ||
                        (s.getTenthPercentage() != null && s.getTenthPercentage() >= tenth))

                .filter(s -> twelfth == null ||
                        (s.getTwelfthPercentage() != null && s.getTwelfthPercentage() >= twelfth))

                .filter(s -> backlogs == null ||
                        (s.getBacklogs() != null && s.getBacklogs() <= backlogs))

                .filter(s -> batch == null ||
                        (s.getBatchYear() != null && s.getBatchYear().equals(batch)))

                .toList();
    }

    private String getCellValue(Cell cell) {

        if (cell == null)
            return null;

        if (cell.getCellType() == CellType.STRING)
            return cell.getStringCellValue().trim();

        if (cell.getCellType() == CellType.NUMERIC)
            return String.valueOf((long) cell.getNumericCellValue());

        return null;
    }

    private Integer parseInteger(Cell cell) {

        try {

            if (cell == null)
                return null;

            if (cell.getCellType() == CellType.NUMERIC)
                return (int) cell.getNumericCellValue();

            if (cell.getCellType() == CellType.STRING) {

                String value = cell.getStringCellValue();

                if (value.equalsIgnoreCase("NA") || value.isEmpty())
                    return null;

                return Integer.parseInt(value);
            }

        } catch (Exception e) {
            return null;
        }

        return null;
    }

    private Double parseDouble(Cell cell) {

        try {

            if (cell == null)
                return null;

            if (cell.getCellType() == CellType.NUMERIC)
                return cell.getNumericCellValue();

            if (cell.getCellType() == CellType.STRING) {

                String value = cell.getStringCellValue();

                if (value.equalsIgnoreCase("NA") || value.isEmpty())
                    return null;

                return Double.parseDouble(value);
            }

        } catch (Exception e) {
            return null;
        }

        return null;
    }

    @Override
    public DepartmentAnalyticsDTO getDepartmentAnalytics(Long coordinatorId) {

        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() -> new RuntimeException("Coordinator not found"));

        Department department = coordinator.getDepartment();

        List<StudentProfile> students = studentProfileRepository.findByDepartment(department);

        long totalStudents = students.size();

      long eligibleStudents = students.stream()

        .filter(s -> s.getTenthPercentage() != null &&
                     s.getTenthPercentage() >= 60)

        .filter(s -> s.getTwelfthPercentage() != null &&
                     s.getTwelfthPercentage() >= 60)

        .count();

        long placedStudents = students.stream()
                .filter(s -> s.getOverallStatus() != null &&
                        s.getOverallStatus().name().equals("PLACED"))
                .count();

        long notPlacedStudents = students.stream()
                .filter(s -> s.getOverallStatus() != null &&
                        s.getOverallStatus().name().equals("NOT_PLACED"))
                .count();

        double averageCgpa = students.stream()
                .filter(s -> s.getCgpa() != null)
                .mapToDouble(StudentProfile::getCgpa)
                .average()
                .orElse(0.0);

        double placementPercentage = 0;

        if (totalStudents > 0) {
            placementPercentage = ((double) placedStudents / totalStudents) * 100;
        }

        return new DepartmentAnalyticsDTO(
                totalStudents,
                eligibleStudents,
                placedStudents,
                notPlacedStudents,
                averageCgpa,
                placementPercentage);
    }

    

    @Override
    public ByteArrayInputStream downloadDepartmentStudentsReport(Long coordinatorId) {

        try {

            User coordinator = userRepository.findById(coordinatorId)
                    .orElseThrow(() -> new RuntimeException("Coordinator not found"));

            Department department = coordinator.getDepartment();

            List<StudentProfile> students = studentProfileRepository.findByDepartment(department);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Department Students");

            Row header = sheet.createRow(0);

            header.createCell(0).setCellValue("Register No");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Email");
            header.createCell(3).setCellValue("Phone");
            header.createCell(4).setCellValue("CGPA");
            header.createCell(5).setCellValue("Backlogs");
            header.createCell(6).setCellValue("Batch");
            header.createCell(7).setCellValue("Status");

            int rowIdx = 1;

            for (StudentProfile s : students) {

                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(s.getRegisterNo());

                row.createCell(1).setCellValue(
                        s.getUser() != null ? s.getUser().getName() : "");

                row.createCell(2).setCellValue(
                        s.getUser() != null ? s.getUser().getEmail() : "");

                row.createCell(3).setCellValue(
                        s.getPhoneNumber() != null ? s.getPhoneNumber() : "");

                row.createCell(4).setCellValue(
                        s.getCgpa() != null ? s.getCgpa() : 0);

                row.createCell(5).setCellValue(
                        s.getBacklogs() != null ? s.getBacklogs() : 0);

                row.createCell(6).setCellValue(
                        s.getBatchYear() != null ? s.getBatchYear() : 0);

                row.createCell(7).setCellValue(
                        s.getOverallStatus() != null ? s.getOverallStatus().name() : "");
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            workbook.close();

            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {

            throw new RuntimeException("Error generating department students report");
        }
    }

    @Override
public ByteArrayInputStream downloadDepartmentPlacementsReport(Long coordinatorId) {

    try {

        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() -> new RuntimeException("Coordinator not found"));

        Department department = coordinator.getDepartment();

        List<StudentProfile> students =
                studentProfileRepository.findByDepartment(department);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Department Placements");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Register No");
        header.createCell(1).setCellValue("Name");
        header.createCell(2).setCellValue("Email");
        header.createCell(3).setCellValue("Status");
        header.createCell(4).setCellValue("CGPA");
        header.createCell(5).setCellValue("Batch");

        int rowIdx = 1;

        for (StudentProfile s : students) {

            Row row = sheet.createRow(rowIdx++);

            row.createCell(0).setCellValue(s.getRegisterNo());

            row.createCell(1).setCellValue(
                    s.getUser() != null ? s.getUser().getName() : "");

            row.createCell(2).setCellValue(
                    s.getUser() != null ? s.getUser().getEmail() : "");

            row.createCell(3).setCellValue(
                    s.getOverallStatus() != null ?
                            s.getOverallStatus().name() : "NOT_PLACED");

            row.createCell(4).setCellValue(
                    s.getCgpa() != null ? s.getCgpa() : 0);

            row.createCell(5).setCellValue(
                    s.getBatchYear() != null ? s.getBatchYear() : 0);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());

    } catch (Exception e) {

        throw new RuntimeException("Error generating department placements report");
    }
}
}