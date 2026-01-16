
import axios from "axios";

const API = axios.create({
  baseURL: "https://project-backend-dusky-two.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor to include token
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
