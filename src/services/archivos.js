import { apiProductos } from './clienteApi';

export function subirArchivo(file) {
  const fd = new FormData();
  fd.append('file', file);
  return apiProductos.post('/files', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
}

export function descargarArchivo(id) {
  return apiProductos.get(`/files/${id}`, { responseType: 'arraybuffer' }).then(r => r.data);
}
