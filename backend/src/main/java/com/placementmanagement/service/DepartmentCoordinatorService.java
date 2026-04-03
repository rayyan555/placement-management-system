package com.placementmanagement.service;

import com.placementmanagement.dto.DepartmentAnalyticsDTO;
import com.placementmanagement.entity.StudentProfile;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import com.placementmanagement.dto.DepartmentAnalyticsDTO;

public interface DepartmentCoordinatorService {

    List<StudentProfile> getStudentsByDepartment(Long coordinatorId);

    StudentProfile updateStudentDetails(Long studentId, StudentProfile updatedStudent);

    //Object getDepartmentAnalytics(Long coordinatorId);

    void uploadDepartmentStudents(Long coordinatorId, MultipartFile file);

    List<StudentProfile> filterDepartmentStudents(
        Long coordinatorId,
        Double cgpa,
        Double tenth,
        Double twelfth,
        Integer backlogs,
        Integer batch);

        DepartmentAnalyticsDTO getDepartmentAnalytics(Long coordinatorId);

        ByteArrayInputStream downloadDepartmentStudentsReport(Long coordinatorId);

        ByteArrayInputStream downloadDepartmentPlacementsReport(Long coordinatorId);

}