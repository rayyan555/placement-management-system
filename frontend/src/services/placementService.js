import axios from "axios";

const API = "http://localhost:8080/api/coordinator";

export const addPlacement = async (studentId, companyName, packageOffered) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/placement`,
    null,
    {
      params: {
        studentId,
        companyName,
        packageOffered
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};