package com.placementmanagement.service;

import org.springframework.core.io.Resource;

public interface ReportService {

    Resource generatePlacementsReport();


    Resource generateDrivesReport();

Resource generateFeedbackReport();
Resource generateStudentsReport();

}