import { apiVentas } from './clienteApi';

export function crearVenta(venta) { return apiVentas.post('/ventas', venta).then(r => r.data); }
export function listarVentas() { return apiVentas.get('/ventas').then(r => r.data); }
export function obtenerVenta(id) { return apiVentas.get(`/ventas/${id}`).then(r => r.data); }
