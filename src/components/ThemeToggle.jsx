// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';

const THEME_KEY = 'ms_theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setAttrs(theme) {
  const root = document.documentElement; // <html>
  root.setAttribute('data-bs-theme', theme); // Bootstrap 5.3+
  root.setAttribute('data-theme', theme);    // tus tokens
}

function ensureCurtain() {
  let el = document.getElementById('theme-curtain');
  if (!el) {
    el = document.createElement('div');
    el.id = 'theme-curtain';
    document.body.appendChild(el);
  }
  return el;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    setAttrs(theme); // aplica sin animación al montar
  }, []); // eslint-disable-line

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);

    const curtain = ensureCurtain();

    // 1) Fade-in del telón
    curtain.classList.add('show');

    // 2) Cambiamos tema cuando el telón ya cubrió la UI
    //    (espera un frame + pequeño delay para garantizar repintado)
    requestAnimationFrame(() => {
      setTimeout(() => {
        setAttrs(next);
        try { localStorage.setItem(THEME_KEY, next); } catch {}

        // 3) Fade-out del telón y limpieza
        setTimeout(() => {
          curtain.classList.remove('show');
        }, 50); // empieza a desaparecer casi inmediato

      }, 120); // telón visible antes del swap de tema
    });
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-outline-choco d-flex align-items-center gap-2"
      aria-pressed={isDark}
      title={isDark ? 'Cambiar a claro' : 'Cambiar a oscuro'}
    >
      <span role="img" aria-hidden="true">{isDark ? '🌙' : '🦁'}</span>
      {isDark ? 'Oscuro' : 'Claro'}
    </button>
  );
}
