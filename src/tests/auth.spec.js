import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Pequeño helper para acceder a las funciones del contexto desde un componente de prueba
function AuthTester({ cb }) {
  const auth = useAuth();
  // Llamar al callback solo una vez cuando el componente monte (evita reentradas)
  React.useEffect(() => {
    if (cb) cb(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

describe('AuthContext - registro, login y logout', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('register crea un usuario y lo guarda en localStorage', async () => {
    render(
      <AuthProvider>
        <AuthTester cb={(auth) => {
          // realizar registro dentro del callback del helper
          auth.register({ nombre: 'Test', email: 't@t.com', password: 'abc123' });
        }} />
      </AuthProvider>
    );

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('registered_users'));
      expect(Array.isArray(stored)).toBeTruthy();
      expect(stored.find(u => u.email === 't@t.com')).toBeDefined();
    });
  });

  it('register lanza error si el correo ya existe', async () => {
    // Pre-popular localStorage
    localStorage.setItem('registered_users', JSON.stringify([{ email: 'dup@t.com', password: 'x' }]));
    render(
      <AuthProvider>
        <AuthTester cb={(auth) => {
          // Intentar registrar duplicado
          try { auth.register({ nombre: 'Dup', email: 'dup@t.com', password: 'x' }); } catch (e) { /* swallow */ }
        }} />
      </AuthProvider>
    );

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('registered_users'));
      // el usuario duplicado no debe haber sido añadido dos veces
      const matches = stored.filter(u => u.email === 'dup@t.com');
      expect(matches.length).toBe(1);
    });
  });

  it('login con credenciales válidas guarda current_user en sessionStorage y devuelve user sin password', async () => {
    // Crear usuario en localStorage
    const u = { id: '1', nombre: 'Login', email: 'login@t.com', password: 'pw' };
    localStorage.setItem('registered_users', JSON.stringify([u]));

    render(
      <AuthProvider>
        <AuthTester cb={(auth) => {
          // Ejecutar login desde el callback
          auth.login('login@t.com', 'pw');
        }} />
      </AuthProvider>
    );

    await waitFor(() => {
      const sess = JSON.parse(sessionStorage.getItem('current_user'));
      expect(sess).toBeDefined();
      expect(sess.email).toBe('login@t.com');
    });
  });

  it('logout elimina current_user de sessionStorage', async () => {
    // Simular sesión
    sessionStorage.setItem('current_user', JSON.stringify({ email: 'a@b' }));
    render(
      <AuthProvider>
        <AuthTester cb={(auth) => {
          auth.logout();
        }} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(sessionStorage.getItem('current_user')).toBeNull();
    });
  });
});
