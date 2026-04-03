package com.placementmanagement.service.impl;

import com.placementmanagement.dto.PlacementAnalyticsDTO;
import com.placementmanagement.entity.CompanyDrive;
import com.placementmanagement.entity.Department;
import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.InterviewFeedback;
import com.placementmanagement.entity.PlacementDetails;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.User;
import com.placementmanagement.entity.enums.PlacementStatus;
import com.placementmanagement.entity.enums.Role;
import com.placementmanagement.repository.CompanyDriveRepository;
import com.placementmanagement.repository.DepartmentRepository;
import com.placementmanagement.repository.DriveStudentStatusRepository;
import com.placementmanagement.repository.InterviewFeedbackRepository;
import com.placementmanagement.repository.PlacementDetailsRepository;
import com.placementmanagement.repository.StudentProfileRepository;
import com.placementmanagement.repository.UserRepository;
import java.util.Optional;
import com.placementmanagement.service.CoordinatorService;
import com.placementmanagement.util.StudentSpecification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

import java.util.List;

@Service
public class CoordinatorServiceImpl implements CoordinatorService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final PlacementDetailsRepository placementDetailsRepository;
    private final CompanyDriveRepository companyDriveRepository;
    private final InterviewFeedbackRepository interviewFeedbackRepository;
    private final DriveStudentStatusRepository driveStudentStatusRepository;
    private final PasswordEncoder passwordEncoder;

    public CoordinatorServiceImpl(UserRepository userRepository,
            DepartmentRepository departmentRepository,
            StudentProfileRepository studentProfileRepository,
            PlacementDetailsRepository placementDetailsRepository,
            CompanyDriveRepository companyDriveRepository,
            InterviewFeedbackRepository interviewFeedbackRepository,
            PasswordEncoder passwordEncoder,
            DriveStudentStatusRepository driveStudentStatusRepository) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.placementDetailsRepository = placementDetailsRepository;
        this.companyDriveRepository = companyDriveRepository;
        this.interviewFeedbackRepository = interviewFeedbackRepository;
        this.driveStudentStatusRepository = driveStudentStatusRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User assignDepartmentCoordinator(Long userId, Long departmentId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        user.setRole(Role.DEPT_COORDINATOR);
        user.setDepartment(department);

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllDepartmentCoordinators() {
        return userRepository.findByRole(Role.DEPT_COORDINATOR);
    }

    @Override
    public List<StudentProfile> filterStudents(
            String department,
            Double cgpa,
            Double tenth,
            Double twelfth,
            Integer backlogs,
            Integer batch) {

        Specification<StudentProfile> spec = Specification.where(null);

        if (department != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("department").get("name"), department));
        }

        if (cgpa != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("cgpa"), cgpa));
        }

        if (tenth != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("tenthPercentage"), tenth));
        }

        if (twelfth != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("twelfthPercentage"), twelfth));
        }

        if (backlogs != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("backlogs"), backlogs));
        }

        if (batch != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("batchYear"), batch));
        }

        return studentProfileRepository.findAll(spec);
    }

    @Override
    public PlacementAnalyticsDTO getPlacementAnalytics() {

        long totalStudents = studentProfileRepository.count();
        long totalDrives = companyDriveRepository.count();
       long placedStudents =
        studentProfileRepository.countByOverallStatus(PlacementStatus.PLACED);

        Double highestPackage = placementDetailsRepository.findHighestPackage();
        Double averagePackage = placementDetailsRepository.findAveragePackage();

        double placementPercentage = 0;

        if (totalStudents > 0) {
            placementPercentage = (placedStudents * 100.0) / totalStudents;
        }

        return new PlacementAnalyticsDTO(
                totalStudents,
                totalDrives,
                placedStudents,
                placementPercentage,
                highestPackage != null ? highestPackage : 0,
                averagePackage != null ? averagePackage : 0);
    }

    @Override
public void addPlacement(Long studentId, String companyName, Double packageOffered) {

    StudentProfile student = studentProfileRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    // prevent duplicate placement
    PlacementDetails existing = placementDetailsRepository.findByStudent_Id(studentId);

    if (existing != null) {
        throw new RuntimeException("Student already placed");
    }

    // update student status
    student.setOverallStatus(PlacementStatus.PLACED);
    studentProfileRepository.save(student);

    // create placement record
    PlacementDetails placement = new PlacementDetails();

    placement.setStudent(student);
    placement.setCompanyName(companyName);
    placement.setPackageOffered(packageOffered);
    placement.setPlacementDate(LocalDate.now());

    placementDetailsRepository.save(placement);
}

    @Override
    public ByteArrayInputStream downloadStudentsReport() {

        try {

            List<StudentProfile> students = studentProfileRepository.findAll();

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Students");

            Row header = sheet.createRow(0);

            header.createCell(0).setCellValue("Name");
            header.createCell(1).setCellValue("Email");
            header.createCell(2).setCellValue("Phone");
            header.createCell(3).setCellValue("Register No");
            header.createCell(4).setCellValue("Batch");
            header.createCell(5).setCellValue("Department");
            header.createCell(6).setCellValue("CGPA");
            header.createCell(7).setCellValue("10th %");
            header.createCell(8).setCellValue("12th %");
            header.createCell(9).setCellValue("Diploma %");
            header.createCell(10).setCellValue("Backlogs");

            int rowNum = 1;

            for (StudentProfile s : students) {

                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(
                        s.getUser() != null ? s.getUser().getName() : "");

                row.createCell(1).setCellValue(
                        s.getUser() != null ? s.getUser().getEmail() : "");

                row.createCell(2).setCellValue(
                        s.getPhoneNumber() != null ? s.getPhoneNumber() : "");

                row.createCell(3).setCellValue(
                        s.getRegisterNo() != null ? s.getRegisterNo() : "");

                row.createCell(4).setCellValue(
                        s.getBatchYear() != null ? s.getBatchYear() : 0);

                row.createCell(5).setCellValue(
                        s.getDepartment() != null ? s.getDepartment().getName() : "");

                row.createCell(6).setCellValue(
                        s.getCgpa() != null ? s.getCgpa() : 0);

                row.createCell(7).setCellValue(
                        s.getTenthPercentage() != null ? s.getTenthPercentage() : 0);

                row.createCell(8).setCellValue(
                        s.getTwelfthPercentage() != null ? s.getTwelfthPercentage() : 0);

                row.createCell(9).setCellValue(
                        s.getDiplomaPercentage() != null ? s.getDiplomaPercentage() : 0);

                row.createCell(10).setCellValue(
                        s.getBacklogs() != null ? s.getBacklogs() : 0);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            workbook.close();

            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to generate students report: " + e.getMessage());
        }
    }
@Override
public ByteArrayInputStream downloadPlacementsReport() {
    System.out.println("PLACEMENT REPORT METHOD EXECUTED");

    try {

        List<PlacementDetails> placements =
                placementDetailsRepository.findAll();

        System.out.println("Placements found: " + placements.size());

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

            StudentProfile student = p.getStudent();

            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(student.getUser().getName());
            row.createCell(1).setCellValue(student.getRegisterNo());
            row.createCell(2).setCellValue(p.getCompanyName());
            row.createCell(3).setCellValue(p.getPackageOffered());
            row.createCell(4).setCellValue(p.getPlacementDate().toString());
            row.createCell(5).setCellValue("PLACED");
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());
        

    } catch (Exception e) {

        e.printStackTrace();
        throw new RuntimeException("Failed to generate placement report");

    }
}
    

@Override
public void uploadStudentsExcel(MultipartFile file) {

    try {

        Workbook workbook = WorkbookFactory.create(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        DataFormatter formatter = new DataFormatter();

        for (Row row : sheet) {

            // Skip header
            if (row.getRowNum() == 0) continue;

            String name = formatter.formatCellValue(row.getCell(1));
            String email = formatter.formatCellValue(row.getCell(2));
            String phoneNumber = formatter.formatCellValue(row.getCell(3));
            String registerNo = formatter.formatCellValue(row.getCell(4));

            String batchStr = formatter.formatCellValue(row.getCell(5));
            Integer batchYear = batchStr.isEmpty() ? 0 : Integer.parseInt(batchStr);

            LocalDate dob = null;
            if (row.getCell(6) != null && row.getCell(6).getCellType() == CellType.NUMERIC) {
                dob = row.getCell(6).getLocalDateTimeCellValue().toLocalDate();
            }

            String city = formatter.formatCellValue(row.getCell(7));
            String degree = formatter.formatCellValue(row.getCell(8));
            String departmentName = formatter.formatCellValue(row.getCell(9));
            String college = formatter.formatCellValue(row.getCell(10));
            String gender = formatter.formatCellValue(row.getCell(11));

            Double tenth = parseDouble(formatter.formatCellValue(row.getCell(12)));
            Double twelfth = parseDouble(formatter.formatCellValue(row.getCell(13)));
            Double diploma = parseDouble(formatter.formatCellValue(row.getCell(14)));
            Double cgpa = parseDouble(formatter.formatCellValue(row.getCell(15)));

            String resumeLink = formatter.formatCellValue(row.getCell(16));

            // 🔥 Skip empty rows
            if (email.isEmpty()) continue;

            // ✅ Find department
            Department department = departmentRepository
                    .findByName(departmentName)
                    .orElseThrow(() -> new RuntimeException("Department not found: " + departmentName));

            // 🔥 CHECK if user already exists (IMPORTANT)
            Optional<User> existingUser = userRepository.findFirstByEmail(email);

            User user;

            if (existingUser.isPresent()) {
                user = existingUser.get();
            } else {
                user = new User();
                user.setName(name);
                user.setEmail(email);
                user.setPassword(passwordEncoder.encode("default123"));
                user.setRole(Role.STUDENT);

                // 🔥 CRITICAL FIX (THIS WAS MISSING)
                user.setDepartment(department);

                user = userRepository.save(user);
            }

            // 🔥 CHECK if profile already exists
            Optional<StudentProfile> existingProfile =
                    studentProfileRepository.findByUser(user);

            StudentProfile profile;

            if (existingProfile.isPresent()) {
                profile = existingProfile.get();
            } else {
                profile = new StudentProfile();
                profile.setUser(user);
            }

            // ✅ Set all fields
            profile.setRegisterNo(registerNo);
            profile.setDateOfBirth(dob);
            profile.setCity(city);
            profile.setDegree(degree);
            profile.setCollege(college);
            profile.setGender(gender);
            profile.setTenthPercentage(tenth);
            profile.setTwelfthPercentage(twelfth);
            profile.setDiplomaPercentage(diploma);
            profile.setCgpa(cgpa);
            profile.setResumePath(resumeLink);
            profile.setDepartment(department);
            profile.setPhoneNumber(phoneNumber);
            profile.setBatchYear(batchYear);

            studentProfileRepository.save(profile);
        }

        workbook.close();

    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Failed to upload Excel file: " + e.getMessage());
    }
}
private Double parseDouble(String value) {
    try {
        return value.isEmpty() ? 0.0 : Double.parseDouble(value);
    } catch (Exception e) {
        return 0.0;
    }
}

    

   

   
    private String getStringValue(Cell cell) {

        if (cell == null)
            return null;

        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue().trim();
        }

        if (cell.getCellType() == CellType.NUMERIC) {
            return String.valueOf(cell.getNumericCellValue());
        }

        return null;
    }

    private Double getNumericValue(Cell cell) {

        if (cell == null)
            return null;

        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        }

        if (cell.getCellType() == CellType.STRING) {

            String value = cell.getStringCellValue().trim();

            if (value.isEmpty() || value.equalsIgnoreCase("NA")) {
                return null;
            }

            return Double.parseDouble(value);
        }

        return null;
    }

    private LocalDate getDateValue(Cell cell) {

        if (cell == null)
            return null;

        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getLocalDateTimeCellValue().toLocalDate();
        }

        return null;
    }

    @Override
    public User removeDepartmentCoordinator(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setDepartment(null);
        user.setRole(Role.STUDENT);

        return userRepository.save(user);
    }
}