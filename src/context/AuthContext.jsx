import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, fetchCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde sessionStorage al iniciar la app
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCurrentUser(token)
      .then((user) => setCurrentUser(user))
      .catch(() => sessionStorage.removeItem("accessToken"))
      .finally(() => setLoading(false));
  }, []);

  // Función de Login
  const login = async (email, password) => {
    const res = await loginUser(email, password);
    sessionStorage.setItem("accessToken", res.accessToken);
    
    // Obtenemos los datos del usuario (roles, nombre, etc.)
    const user = await fetchCurrentUser(res.accessToken);
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setCurrentUser(null);
  };

  // Lógica robusta para detectar si es Admin
  const checkIsAdmin = (user) => {
    if (!user) return false;
    
    // Caso 1: El objeto usuario tiene una propiedad booleana 'isAdmin'
    if (user.isAdmin === true) return true;

    // Caso 2: El rol viene como string directo (ej: "ROLE_ADMIN")
    if (user.role === 'ROLE_ADMIN' || user.role === 'admin') return true;

    // Caso 3: Los roles vienen en un array (Lo más común en Spring Security)
    if (Array.isArray(user.roles)) {
        return user.roles.includes('ROLE_ADMIN') || user.roles.includes('admin');
    }

    return false;
  };

  const isAdmin = checkIsAdmin(currentUser);

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      login,
      logout,
      isAdmin // Exponemos el valor calculado
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);