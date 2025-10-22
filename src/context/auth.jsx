// src/context/auth.jsx
/**
 * Contexto de autenticación de la aplicación.
 * Maneja el estado de autenticación del usuario, persistencia en localStorage
 * y sincronización entre pestañas.
 * 
 * @module AuthContext
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LS_KEY = 'auth:user';
const AuthContext = createContext(null);

/**
 * Provider del contexto de autenticación.
 * Proporciona funcionalidad de login/logout con persistencia y caducidad de sesión.
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Provider con el contexto de autenticación
 */
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

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * Verifica contra usuarios registrados en localStorage o credenciales demo.
   * 
   * @param {string} username - Nombre de usuario o email
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Resultado de la operación con ok y mensaje opcional
   */
  const login = async (username, password) => {
    try {
      // Primero verificar usuarios registrados
      const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = registeredUsers.find(
        u => (u.email === username || u.username === username) && u.password === password
      );
      
      if (foundUser) {
        const u = { 
          username: foundUser.username, 
          email: foundUser.email,
          issuedAt: Date.now() 
        };
        setUser(u);
        return { ok: true };
      }
      
      // Demo: valida admin/123456 (mantener por compatibilidad)
      if (username === 'admin' && password === '123456') {
        const u = { username: 'admin', issuedAt: Date.now() };
        setUser(u);
        return { ok: true };
      }
      
      return { ok: false, message: 'Usuario o contraseña incorrectos' };
    } catch (error) {
      console.error('Error durante el login:', error);
      return { ok: false, message: 'Error al intentar iniciar sesión' };
    }
  };

  /**
   * Cierra la sesión del usuario actual.
   * Limpia el estado y elimina datos de localStorage.
   */
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

/**
 * Hook para acceder al contexto de autenticación.
 * Debe usarse dentro de un componente hijo de AuthProvider.
 * 
 * @returns {Object} Objeto con user, isAuthenticated, login, logout
 * @throws {Error} Si se usa fuera de AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
