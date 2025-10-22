// src/context/AccessibilityContext.jsx
/**
 * Contexto de accesibilidad de la aplicación.
 * Maneja opciones de accesibilidad como alto contraste, tamaño de texto y reducción de movimiento.
 * 
 * @module AccessibilityContext
 */
import { createContext, useContext, useEffect, useState } from 'react';

const LS_KEY = 'accessibility:settings';
const AccessibilityContext = createContext(null);

/**
 * Provider del contexto de accesibilidad.
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Provider con el contexto de accesibilidad
 */
export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      focusIndicators: true
    };
  });

  // Persiste configuración en localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Aplica las clases al documento
  useEffect(() => {
    const root = document.documentElement;
    
    // Alto contraste
    if (settings.highContrast) {
      root.setAttribute('data-high-contrast', 'true');
    } else {
      root.removeAttribute('data-high-contrast');
    }
    
    // Texto grande
    if (settings.largeText) {
      root.setAttribute('data-large-text', 'true');
    } else {
      root.removeAttribute('data-large-text');
    }
    
    // Movimiento reducido
    if (settings.reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }
    
    // Indicadores de foco mejorados
    if (settings.focusIndicators) {
      root.setAttribute('data-focus-indicators', 'true');
    } else {
      root.removeAttribute('data-focus-indicators');
    }
  }, [settings]);

  /**
   * Alterna el modo de alto contraste
   */
  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  /**
   * Alterna el tamaño de texto grande
   */
  const toggleLargeText = () => {
    setSettings(prev => ({ ...prev, largeText: !prev.largeText }));
  };

  /**
   * Alterna el movimiento reducido
   */
  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  /**
   * Alterna los indicadores de foco mejorados
   */
  const toggleFocusIndicators = () => {
    setSettings(prev => ({ ...prev, focusIndicators: !prev.focusIndicators }));
  };

  /**
   * Resetea todas las configuraciones a sus valores por defecto
   */
  const resetSettings = () => {
    setSettings({
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      focusIndicators: true
    });
  };

  const value = {
    settings,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleFocusIndicators,
    resetSettings
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Hook para acceder al contexto de accesibilidad.
 * 
 * @returns {Object} Configuraciones y funciones de accesibilidad
 * @throws {Error} Si se usa fuera de AccessibilityProvider
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe usarse dentro de un AccessibilityProvider');
  }
  return context;
}
