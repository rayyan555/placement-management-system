package com.placementmanagement.dto;

public class PlacementAnalyticsDTO {

    private long totalStudents;
    private long totalDrives;
    private long totalPlacedStudents;
    private double placementPercentage;
    private double highestPackage;
    private double averagePackage;

    public PlacementAnalyticsDTO(long totalStudents, long totalDrives,
                                 long totalPlacedStudents,
                                 double placementPercentage,
                                 double highestPackage,
                                 double averagePackage) {

        this.totalStudents = totalStudents;
        this.totalDrives = totalDrives;
        this.totalPlacedStudents = totalPlacedStudents;
        this.placementPercentage = placementPercentage;
        this.highestPackage = highestPackage;
        this.averagePackage = averagePackage;
    }

    public long getTotalStudents() { return totalStudents; }
    public long getTotalDrives() { return totalDrives; }
    public long getTotalPlacedStudents() { return totalPlacedStudents; }
    public double getPlacementPercentage() { return placementPercentage; }
    public double getHighestPackage() { return highestPackage; }
    public double getAveragePackage() { return averagePackage; }
}