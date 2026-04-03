package com.placementmanagement.repository;

import com.placementmanagement.entity.InterviewFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewFeedbackRepository
        extends JpaRepository<InterviewFeedback, Long> {

    List<InterviewFeedback> findByStudent_Id(Long studentId);

    List<InterviewFeedback> findByDrive_Id(Long driveId);
}