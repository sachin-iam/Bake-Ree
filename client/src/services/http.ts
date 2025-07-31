// client/src/services/http.ts
import axios, { type InternalAxiosRequestConfig } from "axios";

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

export default http;
