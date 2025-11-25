import api from './api';

export async function register(data) {
  return api.post('/auth/register', data).then(r => r.data);
}

export async function login(credentials) {
  const res = await api.post('/auth/login', credentials);
  const { accessToken } = res.data;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem('accessToken');
}
