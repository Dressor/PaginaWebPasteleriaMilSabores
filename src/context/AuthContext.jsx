// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Claves para almacenar usuarios en sessionStorage
const USERS_STORAGE_KEY = 'registered_users';
const CURRENT_USER_KEY = 'current_user';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario actual al iniciar
  useEffect(() => {
    const savedUser = sessionStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Registrar un nuevo usuario
  const register = (userData) => {
  // Obtener usuarios existentes (persisten entre cierres del navegador)
  const existingUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    
    // Verificar si el email ya está registrado
    if (existingUsers.some(user => user.email === userData.email)) {
      throw new Error('Este correo electrónico ya está registrado');
    }

    // Crear nuevo usuario con fecha de registro
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString()
    };

    // Agregar a la lista y guardar
    const updatedUsers = [...existingUsers, newUser];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    return newUser;
  };

  // Iniciar sesión
  const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Guardar usuario actual y actualizar estado
    const userWithoutPassword = { ...user, password: undefined };
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    setCurrentUser(userWithoutPassword);

    return userWithoutPassword;
  };

  // Cerrar sesión
  const logout = () => {
    sessionStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  // Obtener pedidos del usuario actual
  const getUserOrders = useCallback(() => {
    if (!currentUser?.email) return [];
    const allOrders = JSON.parse(localStorage.getItem('user_orders') || '{}');
    return allOrders[currentUser.email] || [];
  }, [currentUser]);

  // Guardar un pedido para el usuario actual
  const saveOrder = useCallback((orderData) => {
    if (!currentUser?.email) return;
    const allOrders = JSON.parse(localStorage.getItem('user_orders') || '{}');
    if (!allOrders[currentUser.email]) {
      allOrders[currentUser.email] = [];
    }
    allOrders[currentUser.email].unshift(orderData); // Agregar al inicio
    localStorage.setItem('user_orders', JSON.stringify(allOrders));
  }, [currentUser]);

  const value = {
    currentUser,
    isLoading,
    register,
    login,
    logout,
    getUserOrders,
    saveOrder
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};