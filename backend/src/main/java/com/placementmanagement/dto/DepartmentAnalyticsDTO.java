package com.placementmanagement.dto;

public class DepartmentAnalyticsDTO {

    private long totalStudents;
    private long eligibleStudents;
    private long placedStudents;
    private long notPlacedStudents;
    private double averageCgpa;
    private double placementPercentage;

    public DepartmentAnalyticsDTO() {}

    public DepartmentAnalyticsDTO(long totalStudents,
                                  long eligibleStudents,
                                  long placedStudents,
                                  long notPlacedStudents,
                                  double averageCgpa,
                                  double placementPercentage) {

        this.totalStudents = totalStudents;
        this.eligibleStudents = eligibleStudents;
        this.placedStudents = placedStudents;
        this.notPlacedStudents = notPlacedStudents;
        this.averageCgpa = averageCgpa;
        this.placementPercentage = placementPercentage;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getEligibleStudents() {
        return eligibleStudents;
    }

    public void setEligibleStudents(long eligibleStudents) {
        this.eligibleStudents = eligibleStudents;
    }

    public long getPlacedStudents() {
        return placedStudents;
    }

    public void setPlacedStudents(long placedStudents) {
        this.placedStudents = placedStudents;
    }

    public long getNotPlacedStudents() {
        return notPlacedStudents;
    }

    public void setNotPlacedStudents(long notPlacedStudents) {
        this.notPlacedStudents = notPlacedStudents;
    }

    public double getAverageCgpa() {
        return averageCgpa;
    }

    public void setAverageCgpa(double averageCgpa) {
        this.averageCgpa = averageCgpa;
    }

    public double getPlacementPercentage() {
        return placementPercentage;
    }

    public void setPlacementPercentage(double placementPercentage) {
        this.placementPercentage = placementPercentage;
    }
}