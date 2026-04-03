package com.placementmanagement.controller;

import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.service.StudentProfileService;
import org.springframework.web.bind.annotation.*;
import com.placementmanagement.entity.CompanyDrive;
import com.placementmanagement.entity.DriveStudentStatus;
import com.placementmanagement.entity.enums.ApplicationStatus;
import com.placementmanagement.repository.CompanyDriveRepository;
import com.placementmanagement.repository.DriveStudentStatusRepository;
import com.placementmanagement.repository.StudentProfileRepository;

import org.springframework.security.core.Authentication;
import java.util.Optional;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.net.MalformedURLException;


@RestController
//@RequestMapping("/api/student-profiles")
@RequestMapping("/api/student")
@CrossOrigin
public class StudentProfileController {
    private final CompanyDriveRepository driveRepository;
private final DriveStudentStatusRepository driveStudentStatusRepository;
private final StudentProfileRepository studentRepository;

    private final StudentProfileService service;

   public StudentProfileController(
        StudentProfileService service,
        CompanyDriveRepository driveRepository,
        DriveStudentStatusRepository driveStudentStatusRepository,
        StudentProfileRepository studentRepository) {

    this.service = service;
    this.driveRepository = driveRepository;
    this.driveStudentStatusRepository = driveStudentStatusRepository;
    this.studentRepository = studentRepository;
}

    // Create Profile
    @PostMapping
    public StudentProfile createProfile(@RequestBody StudentProfile profile) {
        return service.createProfile(profile);
    }

    // Get All
    @GetMapping
    public List<StudentProfile> getAllProfiles() {
        return service.getAllProfiles();
    }



@GetMapping("/drives")
public List<CompanyDrive> getAllDrives() {

    return driveRepository.findAll();

}

@PostMapping("/drives/{driveId}/apply")
public DriveStudentStatus applyForDrive(
    
        @PathVariable Long driveId,
        Authentication authentication) {

    String email = authentication.getName();

    StudentProfile student =
            studentRepository.findByUser_Email(email)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

    CompanyDrive drive =
            driveRepository.findById(driveId)
                    .orElseThrow(() -> new RuntimeException("Drive not found"));

    Optional<DriveStudentStatus> existing =
            driveStudentStatusRepository
                    .findByStudent_IdAndDrive_Id(student.getId(), driveId);

    if (existing.isPresent()) {
        throw new RuntimeException("Already applied");
    }

    DriveStudentStatus status = new DriveStudentStatus();
    status.setStudent(student);
    status.setDrive(drive);
    status.setStatus(ApplicationStatus.APPLIED);

    return driveStudentStatusRepository.save(status);
}
    // Get By ID
    @GetMapping("/{id}")
    public StudentProfile getProfile(@PathVariable Long id) {
        return service.getProfileById(id);
    }

    // // Get By User ID
    @GetMapping("/user/{userId}")
    public StudentProfile getProfileByUser(@PathVariable Long userId) {
        return service.getProfileByUserId(userId);
    }



    @GetMapping("/register/{registerNo}")
public StudentProfile getByRegisterNo(@PathVariable String registerNo) {
    return service.getByRegisterNo(registerNo);
}


@GetMapping("/{id}/resume")
public ResponseEntity<Resource> downloadResume(
        @PathVariable Long id) {

    try {

        StudentProfile profile = service.getProfileById(id);

        if (profile.getResumePath() == null) {
            return ResponseEntity.notFound().build();
        }

        Path path = Paths.get(profile.getResumePath());
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

    } catch (MalformedURLException e) {
        return ResponseEntity.internalServerError().build();
    }
}

    // Update
    @PutMapping("/{id}")
    public StudentProfile updateProfile(@PathVariable Long id,
                                        @RequestBody StudentProfile profile) {
        return service.updateProfile(id, profile);
    }


    @PostMapping("/{id}/upload-resume")
public ResponseEntity<String> uploadResume(
        @PathVariable Long id,
        @RequestParam("file") MultipartFile file) {

    try {

        // Allow only PDF
        if (!file.getContentType().equals("application/pdf")) {
            return ResponseEntity.badRequest()
                    .body("Only PDF files are allowed");
        }

        String uploadDir = "uploads/";
        String fileName = id + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir + fileName);

        Files.write(path, file.getBytes());

        // Update resume path using service
        StudentProfile profile = service.getProfileById(id);
        profile.setResumePath(path.toString());
        service.updateProfile(id, profile);

        return ResponseEntity.ok("Resume uploaded successfully");

    } catch (Exception e) {
        return ResponseEntity.internalServerError()
                .body("Upload failed: " + e.getMessage());
    }
}


    // Delete
    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {
        service.deleteProfile(id);
        return "Profile Deleted Successfully";
    }




@PutMapping("/profile/{userId}")
public ResponseEntity<StudentProfile> updateProfileWithFiles(
        @PathVariable Long userId,
        @RequestPart("profile") StudentProfile profile,
        @RequestPart(value = "resume", required = false) MultipartFile resume,
        @RequestPart(value = "photo", required = false) MultipartFile photo) {

    StudentProfile updated =
            service.updateProfileWithFiles(userId, profile, resume, photo);

    return ResponseEntity.ok(updated);
}


}