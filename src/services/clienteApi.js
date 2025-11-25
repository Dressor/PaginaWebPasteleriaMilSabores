import axios from 'axios';

export function crearClienteApi(base) {
  const api = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' } });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return api;
}

export const apiUsuarios = crearClienteApi(process.env.REACT_APP_API_USUARIOS || 'http://localhost:8081/api/v1');
export const apiProductos = crearClienteApi(process.env.REACT_APP_API_PRODUCTOS || 'http://localhost:8082/api/v1');
export const apiVentas = crearClienteApi(process.env.REACT_APP_API_VENTAS || 'http://localhost:8083/api/v1');
