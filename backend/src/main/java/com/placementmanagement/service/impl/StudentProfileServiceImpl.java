package com.placementmanagement.service.impl;

import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.repository.StudentProfileRepository;
import com.placementmanagement.service.StudentProfileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.util.List;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class StudentProfileServiceImpl implements StudentProfileService {

    private final StudentProfileRepository repository;

    public StudentProfileServiceImpl(StudentProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    public StudentProfile createProfile(StudentProfile studentProfile) {
        return repository.save(studentProfile);
    }

    @Override
    public List<StudentProfile> getAllProfiles() {
        return repository.findAll();
    }

    @Override
    public StudentProfile getProfileById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public StudentProfile getProfileByUserId(Long userId) {
        return repository.findByUserId(userId).orElse(null);
    }

    @Override
public StudentProfile getByRegisterNo(String registerNo) {
    return repository.findByRegisterNo(registerNo).orElse(null);
}

    @Override
    public StudentProfile updateProfile(Long id, StudentProfile updatedProfile) {
        StudentProfile existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setRegisterNo(updatedProfile.getRegisterNo());
            existing.setTenthPercentage(updatedProfile.getTenthPercentage());
            existing.setTwelfthPercentage(updatedProfile.getTwelfthPercentage());
            existing.setCgpa(updatedProfile.getCgpa());
            existing.setBacklogs(updatedProfile.getBacklogs());
            existing.setResumePath(updatedProfile.getResumePath());
            existing.setDepartment(updatedProfile.getDepartment());
            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteProfile(Long id) {
        repository.deleteById(id);
    }




@Override
public StudentProfile updateProfileWithFiles(
        Long userId,
        StudentProfile updatedProfile,
        MultipartFile resume,
        MultipartFile photo) {

    StudentProfile existing = repository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

    // 🔥 Update fields
    existing.setRegisterNo(updatedProfile.getRegisterNo());
    existing.setPhoneNumber(updatedProfile.getPhoneNumber());
    existing.setDateOfBirth(updatedProfile.getDateOfBirth());
    existing.setCity(updatedProfile.getCity());
    existing.setDegree(updatedProfile.getDegree());
    existing.setCollege(updatedProfile.getCollege());
    existing.setBatchYear(updatedProfile.getBatchYear());
    existing.setGender(updatedProfile.getGender());

    existing.setTenthPercentage(updatedProfile.getTenthPercentage());
    existing.setTwelfthPercentage(updatedProfile.getTwelfthPercentage());
    existing.setDiplomaPercentage(updatedProfile.getDiplomaPercentage());
    existing.setCgpa(updatedProfile.getCgpa());
    existing.setBacklogs(updatedProfile.getBacklogs());

    String uploadDir = "uploads/";

    try {

        // 🔥 CREATE FOLDER if not exists
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        // 🔥 SAVE PHOTO
        if (photo != null && !photo.isEmpty()) {

            String photoName = userId + "_photo_" + photo.getOriginalFilename();
            Path photoPath = Paths.get(uploadDir, photoName);

            Files.write(photoPath, photo.getBytes());

            existing.setPhotoPath(photoName); // ✅ IMPORTANT
        }

        // 🔥 SAVE RESUME
        if (resume != null && !resume.isEmpty()) {

            String resumeName = System.currentTimeMillis() + "_" + resume.getOriginalFilename();

Path path = Paths.get("uploads", resumeName);
Files.write(path, resume.getBytes());

existing.setResumePath(resumeName); // ✅ ONLY filename// ✅ IMPORTANT
        }

    } catch (Exception e) {
        throw new RuntimeException("File upload failed: " + e.getMessage());
    }

    return repository.save(existing);
}
}