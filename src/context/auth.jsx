// src/context/auth.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LS_KEY = 'auth:user';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  // Persiste y limpia en localStorage
  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  // Sincroniza entre pestañas/ventanas
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_KEY) {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // (Opcional) caducidad de sesión: 8h
  useEffect(() => {
    if (!user?.issuedAt) return;
    const maxAgeMs = 8 * 60 * 60 * 1000;
    const expiresAt = user.issuedAt + maxAgeMs;
    const now = Date.now();
    if (now >= expiresAt) setUser(null); // ya expiró
    const t = setTimeout(() => setUser(null), Math.max(0, expiresAt - now));
    return () => clearTimeout(t);
  }, [user?.issuedAt]);

  const login = async (username, password) => {
    // Demo: valida admin/123456
    if (username === 'admin' && password === '123456') {
      const u = { username: 'admin', issuedAt: Date.now() };
      setUser(u);
      return { ok: true };
    }
    return { ok: false, message: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    setUser(null);            // limpia estado
    localStorage.removeItem(LS_KEY); // redundante pero explícito
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
