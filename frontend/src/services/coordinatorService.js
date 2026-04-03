import api from "../api/axios";

export const getCoordinators = async () => {
  const response = await api.get("/coordinators");
  return response.data;
};

export const assignCoordinator = async (userId, departmentId) => {
  const response = await api.post(
    `/coordinators/assign?userId=${userId}&departmentId=${departmentId}`
  );
  return response.data;
};

export const removeCoordinator = async (userId) => {
  const response = await api.delete(`/coordinators/${userId}`);
  return response.data;
};