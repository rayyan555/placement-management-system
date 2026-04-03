import api from "../api/axios";

export const getPlacementAnalytics = async () => {
  const response = await api.get("/coordinators/analytics");
  return response.data;
};