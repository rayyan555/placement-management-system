
package com.placementmanagement.dto;

import java.time.LocalDate;
import java.util.List;

public class StudentDashboardSummary {

    private String studentName;   // 🔥 NEW FIELD

    private long appliedCount;
    private long shortlistedCount;
    private long selectedCount;
    private String placementStatus;

    private PlacementInfo placementDetails;
    private List<InterviewInfo> upcomingInterviews;

    /* =========================
       INNER CLASS: PLACEMENT
    ========================= */
    public static class PlacementInfo {
        private String company;
        private Double packageOffered;
        private LocalDate placementDate;

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public Double getPackageOffered() {
            return packageOffered;
        }

        public void setPackageOffered(Double packageOffered) {
            this.packageOffered = packageOffered;
        }

        public LocalDate getPlacementDate() {
            return placementDate;
        }

        public void setPlacementDate(LocalDate placementDate) {
            this.placementDate = placementDate;
        }
    }

    /* =========================
       INNER CLASS: INTERVIEW
    ========================= */
    public static class InterviewInfo {
        private String companyName;
        private String role;
        private LocalDate interviewDate;
        private String location;

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
    }

    /* =========================
       GETTERS & SETTERS
    ========================= */

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public long getAppliedCount() {
        return appliedCount;
    }

    public void setAppliedCount(long appliedCount) {
        this.appliedCount = appliedCount;
    }

    public long getShortlistedCount() {
        return shortlistedCount;
    }

    public void setShortlistedCount(long shortlistedCount) {
        this.shortlistedCount = shortlistedCount;
    }

    public long getSelectedCount() {
        return selectedCount;
    }

    public void setSelectedCount(long selectedCount) {
        this.selectedCount = selectedCount;
    }

    public String getPlacementStatus() {
        return placementStatus;
    }

    public void setPlacementStatus(String placementStatus) {
        this.placementStatus = placementStatus;
    }

    public PlacementInfo getPlacementDetails() {
        return placementDetails;
    }

    public void setPlacementDetails(PlacementInfo placementDetails) {
        this.placementDetails = placementDetails;
    }

    public List<InterviewInfo> getUpcomingInterviews() {
        return upcomingInterviews;
    }

    public void setUpcomingInterviews(List<InterviewInfo> upcomingInterviews) {
        this.upcomingInterviews = upcomingInterviews;
    }
}