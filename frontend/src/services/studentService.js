import axios from "axios";

const API_URL = "http://localhost:8080/api";

const authHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

/* =========================
   STUDENT PROFILE
========================= */

export const getStudentProfile = async (userId) => {
  return axios.get(`${API_URL}/student/user/${userId}`, authHeader());
};




export const updateStudentProfile = (userId, profile, resume, photo) => {

  const formData = new FormData();

  formData.append("profile", new Blob([JSON.stringify(profile)], {
    type: "application/json"
  }));

  if (resume) formData.append("resume", resume);
  if (photo) formData.append("photo", photo); // 🔥 IMPORTANT

  return axios.put(
    `http://localhost:8080/api/student/profile/${userId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};
/* =========================
   STUDENT DASHBOARD
========================= */

export const getDashboardSummary = async (studentId) => {
  return axios.get(
    `${API_URL}/student-dashboard/${studentId}/summary`,
    authHeader()
  );
};

/* =========================
   DRIVES
========================= */

export const getDrives = async () => {
  return axios.get(`${API_URL}/student/drives`, authHeader());
};

export const applyForDrive = async (driveId) => {
  return axios.post(
    `${API_URL}/student/drives/${driveId}/apply`,
    {},
    authHeader()
  );
};



export const getAppliedDrives = async () => {
  const studentId = localStorage.getItem("studentProfileId");
  // Use the authHeader() helper defined at the top of your file
  // This ensures the Bearer prefix and token are handled correctly
  // return axios.get(`${API_URL}/applications/student/${studentId}`, authHeader());

  return axios.get(`${API_URL}/drive-status/student/${studentId}`, authHeader());
};
/* =========================
   FEEDBACK
========================= */

export const submitFeedback = async (data) => {
  return axios.post(`${API_URL}/feedback`, data, authHeader());
};



export const getStudentFeedback = async (studentId) => {
  return axios.get(`${API_URL}/feedback/student/${studentId}`, authHeader());
};