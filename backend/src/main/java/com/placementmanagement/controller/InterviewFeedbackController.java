package com.placementmanagement.controller;

import com.placementmanagement.dto.FeedbackRequest;
import com.placementmanagement.entity.*;
import com.placementmanagement.repository.*;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class InterviewFeedbackController {

    private final InterviewFeedbackRepository feedbackRepository;
    private final StudentProfileRepository studentRepository;
    private final CompanyDriveRepository driveRepository;

    public InterviewFeedbackController(
            InterviewFeedbackRepository feedbackRepository,
            StudentProfileRepository studentRepository,
            CompanyDriveRepository driveRepository) {

        this.feedbackRepository = feedbackRepository;
        this.studentRepository = studentRepository;
        this.driveRepository = driveRepository;
    }



@PostMapping
public InterviewFeedback submitFeedback(
        @RequestBody FeedbackRequest request,
        Authentication authentication) {

    // ✅ Get logged-in user email from JWT
    String email = authentication.getName();

    // ✅ Find correct student
    StudentProfile student =
            studentRepository.findByUser_Email(email)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

    CompanyDrive drive =
            driveRepository.findById(request.getDriveId())
                    .orElseThrow(() -> new RuntimeException("Drive not found"));

    InterviewFeedback feedback = new InterviewFeedback();

    feedback.setStudent(student);
    feedback.setDrive(drive);
    feedback.setCompanyName(request.getCompanyName());
    feedback.setRounds(request.getRounds());
    feedback.setQuestions(request.getQuestions());
    feedback.setDifficulty(request.getDifficulty());
    feedback.setExperience(request.getExperience());
    feedback.setTips(request.getTips());

    return feedbackRepository.save(feedback);
}
    // Student view their feedback
    @GetMapping("/student/{studentId}")
    public List<InterviewFeedback> getStudentFeedback(
            @PathVariable Long studentId) {

        return feedbackRepository.findByStudent_Id(studentId);
    }
}