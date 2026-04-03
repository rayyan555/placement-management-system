package com.placementmanagement.entity;

import com.placementmanagement.entity.enums.PlacementStatus;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student_profile")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String registerNo;

    private String phoneNumber;

    private LocalDate dateOfBirth;

    private String city;

    private String degree;

    private String college;
    
    private Integer batchYear;
    private String gender;

    private Double tenthPercentage;

    private Double twelfthPercentage;

    private Double diplomaPercentage;

    private Double cgpa;

    private Integer backlogs;

    private String resumePath;
   private String photoPath;

    @Enumerated(EnumType.STRING)
    private PlacementStatus overallStatus;

    // 🔥 Relation with User (OneToOne)
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 🔥 Relation with Department (ManyToOne)
    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    // Constructor
    public StudentProfile() {
        this.overallStatus = PlacementStatus.NOT_PLACED;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegisterNo() {
        return registerNo;
    }

    public void setRegisterNo(String registerNo) {
        this.registerNo = registerNo;
    }

    public String getPhoneNumber() {
    return phoneNumber;
}

public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
}
public Integer getBatchYear() {
    return batchYear;
}

public void setBatchYear(Integer batchYear) {
    this.batchYear = batchYear;
}

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Double getTenthPercentage() {
        return tenthPercentage;
    }

    public void setTenthPercentage(Double tenthPercentage) {
        this.tenthPercentage = tenthPercentage;
    }

    public Double getTwelfthPercentage() {
        return twelfthPercentage;
    }

    public void setTwelfthPercentage(Double twelfthPercentage) {
        this.twelfthPercentage = twelfthPercentage;
    }

    public Double getDiplomaPercentage() {
        return diplomaPercentage;
    }

    public void setDiplomaPercentage(Double diplomaPercentage) {
        this.diplomaPercentage = diplomaPercentage;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public Integer getBacklogs() {
        return backlogs;
    }

    public void setBacklogs(Integer backlogs) {
        this.backlogs = backlogs;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public PlacementStatus getOverallStatus() {
        return overallStatus;
    }

    public void setOverallStatus(PlacementStatus overallStatus) {
        this.overallStatus = overallStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getPhotoPath() {
    return photoPath;
}

public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
}
}