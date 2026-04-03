package com.placementmanagement.entity;

import com.placementmanagement.entity.enums.ApplicationStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "drive_student_status")
public class DriveStudentStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔥 ManyToOne with StudentProfile
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    // 🔥 ManyToOne with CompanyDrive
    @ManyToOne
    @JoinColumn(name = "drive_id", nullable = false)
    private CompanyDrive drive;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    public DriveStudentStatus() {
        this.status = ApplicationStatus.APPLIED;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public StudentProfile getStudent() {
        return student;
    }

    public void setStudent(StudentProfile student) {
        this.student = student;
    }

    public CompanyDrive getDrive() {
        return drive;
    }

    public void setDrive(CompanyDrive drive) {
        this.drive = drive;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}