package com.placementmanagement.repository;

import com.placementmanagement.entity.PlacementDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlacementDetailsRepository
        extends JpaRepository<PlacementDetails, Long> {

            PlacementDetails findByStudent_Id(Long studentId);

            @Query("SELECT MAX(p.packageOffered) FROM PlacementDetails p")
Double findHighestPackage();

@Query("SELECT AVG(p.packageOffered) FROM PlacementDetails p")
Double findAveragePackage();

@Query("SELECT COUNT(p) FROM PlacementDetails p")
Long countPlacedStudents();
}
