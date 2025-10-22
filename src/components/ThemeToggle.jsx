// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // aplica tema a <html> y a Bootstrap (data-bs-theme)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-bs-theme', theme);   // <-- clave para Bootstrap 5.3
    document.body.dataset.theme = theme;         // compatibilidad con estilos existentes
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="btn btn-outline-choco"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-pressed={isDark}
      title={isDark ? 'Cambiar a claro' : 'Cambiar a oscuro'}
    >
      {isDark ? '🌙 Oscuro' : '🌞 Claro'}
    </button>
  );
}
