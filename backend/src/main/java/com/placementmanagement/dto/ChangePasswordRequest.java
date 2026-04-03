package com.placementmanagement.dto;

public class ChangePasswordRequest {

    private Long userId;
    private String oldPassword;
    private String newPassword;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}

// package com.placementmanagement.dto;

// public class ChangePasswordRequest {

//     private String oldPassword;
//     private String newPassword;

//     public ChangePasswordRequest() {
//     }

//     public String getOldPassword() {
//         return oldPassword;
//     }

//     public void setOldPassword(String oldPassword) {
//         this.oldPassword = oldPassword;
//     }

//     public String getNewPassword() {
//         return newPassword;
//     }

//     public void setNewPassword(String newPassword) {
//         this.newPassword = newPassword;
//     }

//     public Long getUserId() {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'getUserId'");
//     }
// }