package com.placementmanagement.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.placementmanagement.service.ReportService;

@RestController
@RequestMapping("/api/coordinators/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/placements")
    public ResponseEntity<Resource> downloadPlacementsReport() {

        Resource file = reportService.generatePlacementsReport();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=placements_report.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }

    @GetMapping("/students")
public ResponseEntity<Resource> downloadStudentsReport() {

    Resource file = reportService.generateStudentsReport();

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=students_report.xlsx")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(file);
}

     @GetMapping("/drives")
    public ResponseEntity<Resource> downloadDrivesReport() {

        Resource file = reportService.generateDrivesReport();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=drives_report.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }


      @GetMapping("/feedback")
    public ResponseEntity<Resource> downloadFeedbackReport() {

        Resource file = reportService.generateFeedbackReport();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=feedback_report.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }
}


