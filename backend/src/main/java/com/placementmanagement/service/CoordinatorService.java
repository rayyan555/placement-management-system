package com.placementmanagement.service;

import com.placementmanagement.dto.PlacementAnalyticsDTO;
import com.placementmanagement.entity.StudentProfile;
import com.placementmanagement.entity.User;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface CoordinatorService {

    User assignDepartmentCoordinator(Long userId, Long departmentId);

    List<User> getAllDepartmentCoordinators();

    User removeDepartmentCoordinator(Long userId);
  List<StudentProfile> filterStudents(
        String department,
        Double cgpa,
        Double tenth,
        Double twelfth,
        Integer backlogs,
        Integer batch
);
PlacementAnalyticsDTO getPlacementAnalytics();
ByteArrayInputStream downloadPlacementsReport(); 
ByteArrayInputStream downloadStudentsReport();
void addPlacement(Long studentId, String companyName, Double packageOffered);

void uploadStudentsExcel(MultipartFile file);
}