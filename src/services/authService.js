// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/auth";

export async function registrarUsuario(data) {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
}

export async function loginUser(email, password) {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // { accessToken: "xxx" }
}

export async function fetchCurrentUser(token) {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
