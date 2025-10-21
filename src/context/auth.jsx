import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const LS_KEY = "auth.user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      if (typeof window === "undefined") return null;         // SSR-safe
      const saved = window.localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (user) window.localStorage.setItem(LS_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(LS_KEY);
    } catch {}
  }, [user]);

  // Dummy login (cámbialo luego por tu API)
  const login = async (username, password) => {
    if (username === "admin" && password === "123456") {
      const u = { username: "admin", roles: ["admin"] };
      setUser(u);
      return { ok: true, user: u };
    }
    return { ok: false, message: "Usuario o contraseña incorrectos" };
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
