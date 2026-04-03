package com.placementmanagement.entity;

import com.placementmanagement.entity.enums.FeedbackStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "interview_feedback")
public class InterviewFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student who submitted feedback
    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentProfile student;

    // Drive related to feedback
    @ManyToOne
    @JoinColumn(name = "drive_id")
    private CompanyDrive drive;

    private String companyName;

    private String rounds;

    @Column(length = 1000)
    private String questions;

    private String difficulty;

    @Column(length = 2000)
    private String experience;

    @Column(length = 2000)
    private String tips;

    @Enumerated(EnumType.STRING)
    private FeedbackStatus status;

    public InterviewFeedback() {
        this.status = FeedbackStatus.PENDING;
    }

    // Getters and setters

    public Long getId() { return id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public CompanyDrive getDrive() { return drive; }
    public void setDrive(CompanyDrive drive) { this.drive = drive; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getRounds() { return rounds; }
    public void setRounds(String rounds) { this.rounds = rounds; }

    public String getQuestions() { return questions; }
    public void setQuestions(String questions) { this.questions = questions; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getTips() { return tips; }
    public void setTips(String tips) { this.tips = tips; }

    public FeedbackStatus getStatus() { return status; }
    public void setStatus(FeedbackStatus status) { this.status = status; }
}