import axios from "../api/axios";

export const getDepartmentStudents = (coordinatorId) => {
  return axios.get(`/department/students`, {
    params: { coordinatorId },
  });
};

export const updateStudent = (studentId, data) => {
  return axios.put(`/department/students/${studentId}`, data);
};

export const uploadStudents = (coordinatorId, file) => {
  const formData = new FormData();
  formData.append("coordinatorId", coordinatorId);
  formData.append("file", file);

  return axios.post(`/department/upload/students`, formData);
};

export const filterStudents = (params) => {
  return axios.get(`/department/students/filter`, { params });
};

export const getDepartmentAnalytics = (coordinatorId) => {
  return axios.get(`/department/analytics`, {
    params: { coordinatorId },
  });
};

export const downloadStudentReport = (coordinatorId) => {
  return axios.get(`/department/reports/students`, {
    params: { coordinatorId },
    responseType: "blob",
  });
};

export const downloadPlacementReport = (coordinatorId) => {
  return axios.get(`/department/reports/placements`, {
    params: { coordinatorId },
    responseType: "blob",
  });
};