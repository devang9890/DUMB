import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: response interceptor to surface backend errors consistently
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message || err.message || "Network Error";
    return Promise.reject(new Error(message));
  }
);
