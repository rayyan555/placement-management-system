import api from "../api/axios";

export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};
// export const changePassword = async (data) => {
//   const response = await api.put("/auth/change-password", data);
//   return response.data;
// };