package com.placementmanagement.entity;

import com.placementmanagement.entity.enums.DriveStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "company_drive")
public class CompanyDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String role;

    private Double packageOffered;

    private Double minTenth;

    private Double minTwelfth;

    private Double minCgpa;

    private Integer maxBacklogs;

    private LocalDate interviewDate;

    private String location;

    // 🔥 NEW FIELD (Application Link for external company portal)
    private String applicationLink;

    @Enumerated(EnumType.STRING)
    private DriveStatus status;

    // 🔥 ManyToMany with Department
    @ManyToMany
    @JoinTable(
            name = "drive_department",
            joinColumns = @JoinColumn(name = "drive_id"),
            inverseJoinColumns = @JoinColumn(name = "department_id")
    )
    private Set<Department> allowedDepartments;

    // Constructors
    public CompanyDrive() {
        this.status = DriveStatus.UPCOMING;
    }

    // =====================
    // Getters & Setters
    // =====================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Double getPackageOffered() {
        return packageOffered;
    }

    public void setPackageOffered(Double packageOffered) {
        this.packageOffered = packageOffered;
    }

    public Double getMinTenth() {
        return minTenth;
    }

    public void setMinTenth(Double minTenth) {
        this.minTenth = minTenth;
    }

    public Double getMinTwelfth() {
        return minTwelfth;
    }

    public void setMinTwelfth(Double minTwelfth) {
        this.minTwelfth = minTwelfth;
    }

    public Double getMinCgpa() {
        return minCgpa;
    }

    public void setMinCgpa(Double minCgpa) {
        this.minCgpa = minCgpa;
    }

    public Integer getMaxBacklogs() {
        return maxBacklogs;
    }

    public void setMaxBacklogs(Integer maxBacklogs) {
        this.maxBacklogs = maxBacklogs;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public DriveStatus getStatus() {
        return status;
    }

    public void setStatus(DriveStatus status) {
        this.status = status;
    }

    public Set<Department> getAllowedDepartments() {
        return allowedDepartments;
    }

    public void setAllowedDepartments(Set<Department> allowedDepartments) {
        this.allowedDepartments = allowedDepartments;
    }

    // 🔥 NEW GETTER & SETTER

    public String getApplicationLink() {
        return applicationLink;
    }

    public void setApplicationLink(String applicationLink) {
        this.applicationLink = applicationLink;
    }
}