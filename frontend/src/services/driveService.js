import api from "../api/axios";

export const getDrives = async () => {
  const response = await api.get("/drives");
  return response.data;
};

export const createDrive = async (drive) => {
  const response = await api.post("/drives", drive);
  return response.data;
};

export const updateDrive = async (id, drive) => {
  const response = await api.put(`/drives/${id}`, drive);
  return response.data;
};

export const deleteDrive = async (id) => {
  await api.delete(`/drives/${id}`);
};