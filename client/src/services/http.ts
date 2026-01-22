// client/src/services/http.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { clearStoredToken, setSessionExpiredFlag } from "@/utils/jwt";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const http = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// Attach token if present — works with Axios v1 types
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // Ensure headers object exists
        config.headers = config.headers ?? {};
        // Use index signature to avoid AxiosHeaders vs object mismatch
        (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        setSessionExpiredFlag();
        clearStoredToken();
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default http;
