package com.placementmanagement.controller;

import com.placementmanagement.service.CoordinatorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coordinator")
public class CoordinatorPlacementController {

    private final CoordinatorService coordinatorService;

    public CoordinatorPlacementController(CoordinatorService coordinatorService) {
        this.coordinatorService = coordinatorService;
    }

    @PostMapping("/placement")
    public String addPlacement(
            @RequestParam Long studentId,
            @RequestParam String companyName,
            @RequestParam Double packageOffered) {

        coordinatorService.addPlacement(studentId, companyName, packageOffered);

        return "Placement added successfully";
    }
}