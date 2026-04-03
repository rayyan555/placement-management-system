package com.placementmanagement.service;

import com.placementmanagement.entity.StudentProfile;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface StudentProfileService {

    StudentProfile createProfile(StudentProfile studentProfile);

    List<StudentProfile> getAllProfiles();

    StudentProfile getProfileById(Long id);

    StudentProfile getProfileByUserId(Long userId);

    StudentProfile getByRegisterNo(String registerNo);

    StudentProfile updateProfile(Long id, StudentProfile studentProfile);

    void deleteProfile(Long id);

    StudentProfile updateProfileWithFiles(Long userId, StudentProfile profile, MultipartFile resume, MultipartFile photo);
}