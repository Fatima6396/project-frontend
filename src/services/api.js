
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
