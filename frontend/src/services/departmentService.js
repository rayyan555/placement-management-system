import api from "../api/axios";

export const getDepartments = async () => {
  const response = await api.get("/admin/departments");
  return response.data;
};

export const createDepartment = async (department) => {
  const response = await api.post("/admin/departments", department);
  return response.data;
};

export const updateDepartment = async (id, department) => {
  const response = await api.put(`/admin/departments/${id}`, department);
  return response.data;
};

export const deleteDepartment = async (id) => {
  await api.delete(`/admin/departments/${id}`);
};