import axios from "axios";
import { getTokenFromCookie } from "./AuthProvider";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const getMaterialsByCategory = async (ctgrName) => {
//   try {
//     const response = await api.get(`/user/get-materials/${ctgrName}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching materials by category:", error);
//     return [];
//   }
// };

export default api;
