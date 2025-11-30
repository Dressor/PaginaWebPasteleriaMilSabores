import axios from "axios";

const API_URL = "http://localhost:8082/api/v1/productos";

export async function obtenerProductos() {
  try {
    const res = await axios.get(API_URL);

    // VALIDACIÓN para asegurar que siempre devuelva un array
    if (!Array.isArray(res.data)) {
      console.error("ERROR: El backend NO devolvió un array:", res.data);
      return [];
    }

    return res.data;
  } catch (err) {
    console.error("ERROR AL OBTENER PRODUCTOS:", err);
    return [];
  }
}

export async function obtenerProductoPorCodigo(codigo) {
  try {
    const res = await axios.get(`${API_URL}/${codigo}`);

    if (!res.data || typeof res.data !== "object") {
      console.error("ERROR: El backend NO devolvió un producto válido:", res.data);
      return null;
    }

    return res.data;
  } catch (err) {
    console.error("ERROR AL OBTENER PRODUCTO:", err);
    return null;
  }
}

// --- Funciones CRUD (requieren token para POST/PUT/DELETE) ---
function _getAuthHeaders() {
  const token = sessionStorage.getItem('accessToken') || sessionStorage.getItem('auth_token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export async function crearProducto(data) {
  try {
    const res = await axios.post(API_URL, data, _getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('ERROR AL CREAR PRODUCTO:', err);
    throw err;
  }
}

export async function actualizarProducto(codigo, data) {
  try {
    const res = await axios.put(`${API_URL}/${codigo}`, data, _getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('ERROR AL ACTUALIZAR PRODUCTO:', err);
    throw err;
  }
}

export async function eliminarProducto(codigo) {
  try {
    const res = await axios.delete(`${API_URL}/${codigo}`, _getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('ERROR AL ELIMINAR PRODUCTO:', err);
    throw err;
  }
}