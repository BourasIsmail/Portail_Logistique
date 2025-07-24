import axios from "axios";
import { getTokenFromCookie } from "./AuthProvider";

const baseURL = "http://localhost:8080/api";
// const baseURL = "http://172.16.20.6:8080/api";

const getNewAccessToken = async (config) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      { withCredentials: true }
    );
    if (!response.data.refreshToken) {
      console.warn("No new token available, redirecting to login");
      window.location.href = "/login"; // force login
      return config;
    }
    config.headers.Authorization = `Bearer ${response.data.refreshToken}`;
    return config;
  } catch (error) {
    console.error("Failed to refresh access token", error);
  }
};

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token && config.url !== "/auth/refresh") {
    if (document.cookie.match(new RegExp("(^| )jwt=([^;]+)"))) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else if (document.cookie.match(new RegExp("(^| )refreshToken=([^;]+)"))) {
      return getNewAccessToken(config);
    }
  }
  return config;
});

export default api;
