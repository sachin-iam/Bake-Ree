import axios from "axios";
import { clearStoredToken, setSessionExpiredFlag } from "./jwt";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add the token from localStorage to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
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

export default instance;
