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