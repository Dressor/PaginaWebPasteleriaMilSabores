import { apiProductos } from './clienteApi';

export function listarProductos() { return apiProductos.get('/productos').then(r => r.data); }
export function obtenerProducto(id) { return apiProductos.get(`/productos/${id}`).then(r => r.data); }
export function crearProducto(p) { return apiProductos.post('/productos', p).then(r => r.data); }
export function actualizarProducto(id, p) { return apiProductos.put(`/productos/${id}`, p).then(r => r.data); }
export function eliminarProducto(id) { return apiProductos.delete(`/productos/${id}`); }
