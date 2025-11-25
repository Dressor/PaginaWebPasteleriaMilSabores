import { apiUsuarios } from './clienteApi';

export async function registrarUsuario(data) {
  return apiUsuarios.post('/auth/register', data).then(r => r.data);
}

export async function iniciarSesion(creds) {
  const res = await apiUsuarios.post('/auth/login', creds);
  const { accessToken } = res.data;
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  return res.data;
}

export function cerrarSesion() {
  localStorage.removeItem('accessToken');
}
