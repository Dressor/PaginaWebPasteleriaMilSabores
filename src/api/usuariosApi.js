// src/api/usuariosApi.js
import axios from "axios";

const usuariosApi = axios.create({
  baseURL: "http://localhost:8081/api/v1", // backend usuarios
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// Interceptor para añadir Authorization si hay token en sessionStorage
usuariosApi.interceptors.request.use(config => {
  const token = sessionStorage.getItem("auth_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, err => Promise.reject(err));

export default usuariosApi;
