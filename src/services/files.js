import api from './api';

export function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  return api.post('/files', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
}

export function downloadFile(id) {
  return api.get(`/files/${id}`, { responseType: 'arraybuffer' }).then(r => r.data);
}
