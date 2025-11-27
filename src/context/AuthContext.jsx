// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, fetchCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // cargar usuario desde sessionStorage
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

  // login REAL
  const login = async (email, password) => {
    const res = await loginUser(email, password);
    sessionStorage.setItem("accessToken", res.accessToken);
    const user = await fetchCurrentUser(res.accessToken);
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
