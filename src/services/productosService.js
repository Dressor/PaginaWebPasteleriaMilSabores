import axios from "axios";

// Ajusta el puerto si tu backend corre en otro (ej: 8080 o 8082)
const API_URL = "http://localhost:8082/api/v1/productos";

// --- Función auxiliar para obtener Headers con Token ---
function _getAuthHeaders() {
  const token = sessionStorage.getItem('accessToken') || sessionStorage.getItem('auth_token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

// --- 1. Obtener TODOS los productos ---
export async function obtenerProductos() {
  try {
    const res = await axios.get(API_URL);

    // Validación de seguridad para evitar que la app explote si el backend falla
    if (!Array.isArray(res.data)) {
      console.error("ERROR CRÍTICO: El backend no devolvió una lista:", res.data);
      return [];
    }
    return res.data;
  } catch (err) {
    console.error("Error conectando con el backend:", err);
    return [];
  }
}

// --- 2. SOLUCIÓN AL ERROR 400: Buscar por Código "Manualmente" ---
// Como el backend solo acepta IDs numéricos en la URL (ej: /1),
// descargamos toda la lista y buscamos el código (ej: "TORTA01") aquí en el navegador.
export async function obtenerProductoPorCodigo(codigo) {
  try {
    // Paso A: Pedir la lista completa
    const todos = await obtenerProductos();

    // Paso B: Buscar en el array el producto que tenga ese código
    const encontrado = todos.find(p => p.codigo === codigo);

    if (!encontrado) {
      console.warn(`Producto con código '${codigo}' no encontrado.`);
      return null;
    }

    return encontrado;
  } catch (err) {
    console.error("Error buscando producto por código:", err);
    return null;
  }
}

// --- 3. Crear Producto ---
export async function crearProducto(data) {
  try {
    const res = await axios.post(API_URL, data, _getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error al crear:', err);
    throw err;
  }
}

// --- 4. Actualizar Producto (Requiere ID Numérico) ---
// IMPORTANTE: El primer parámetro 'id' debe ser el número (p.id), NO el código (p.codigo).
export async function actualizarProducto(id, data) {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data, _getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error al actualizar:', err);
    throw err;
  }
}

// --- 5. Eliminar Producto (Requiere ID Numérico) ---
// IMPORTANTE: El parámetro 'id' debe ser el número (p.id).
export async function eliminarProducto(id) {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, _getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error al eliminar:', err);
    throw err;
  }
}