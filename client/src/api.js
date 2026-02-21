import axios from "axios";

// Prefer local backend when running the frontend on localhost (dev mode)
const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

const baseURL = isLocalhost
  ? "http://localhost:5000"
  : import.meta.env.VITE_BACKEND_URL || "https://dumb-2.onrender.com";

export const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message || err.message || "Network Error";
    return Promise.reject(new Error(message));
  }
);
