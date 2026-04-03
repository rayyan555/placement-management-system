

import axios from "axios";

const API = "http://localhost:8080/api/drive-status";

// ✅ Always get latest token
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});



export const getStudentApplications = () => {

  const studentId = localStorage.getItem("studentProfileId"); // ✅ FIXED

  return axios.get(`${API}/student/${studentId}`, authHeader());
};

// ✅ Coordinator: get students for drive
export const getDriveApplications = (driveId) => {
  return axios.get(`${API}/drive/${driveId}`, authHeader());
};

// ✅ Coordinator: shortlist
export const shortlistStudent = (statusId) => {
  return axios.put(`${API}/${statusId}/shortlist`, {}, authHeader());
};