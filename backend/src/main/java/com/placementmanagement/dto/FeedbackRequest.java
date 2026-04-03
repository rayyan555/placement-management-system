package com.placementmanagement.dto;

public class FeedbackRequest {

    private Long studentId;
    private Long driveId;
    private String companyName;
    private String rounds;
    private String questions;
    private String difficulty;
    private String experience;
    private String tips;

    // getters & setters

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getDriveId() { return driveId; }
    public void setDriveId(Long driveId) { this.driveId = driveId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getRounds() { return rounds; }
    public void setRounds(String rounds) { this.rounds = rounds; }

    public String getQuestions() { return questions; }
    public void setQuestions(String questions) { this.questions = questions; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getTips() { return tips; }
    public void setTips(String tips) { this.tips = tips; }
}