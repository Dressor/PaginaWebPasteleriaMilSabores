// src/components/AccessibilityMenu.jsx
/**
 * Menú de opciones de accesibilidad.
 * Permite configurar alto contraste, texto grande, movimiento reducido, etc.
 * 
 * @component
 * @returns {JSX.Element} Menú flotante de accesibilidad
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';
import './AccessibilityMenu.css';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, toggleHighContrast, toggleLargeText, toggleReducedMotion, resetSettings } = useAccessibility();

  return (
    <div className="accessibility-menu">
      {/* Botón flotante */}
      <motion.button
        className="accessibility-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir menú de accesibilidad"
        aria-expanded={isOpen}
        title="Opciones de accesibilidad"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="8" r="1.5" />
          <path d="M12 10v4" />
          <path d="M8 14l4-2 4 2" />
          <path d="M10 18h4" />
        </svg>
      </motion.button>

      {/* Panel de opciones */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="accessibility-panel"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Panel de accesibilidad"
          >
            <div className="accessibility-panel-header">
              <h3 className="mb-0">Accesibilidad</h3>
              <button
                className="btn-close-panel"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
              >
                ×
              </button>
            </div>

            <div className="accessibility-panel-body">
              {/* Alto contraste */}
              <div className="accessibility-option">
                <label htmlFor="high-contrast" className="option-label">
                  <span className="option-icon">🎨</span>
                  <div className="option-info">
                    <strong>Alto contraste</strong>
                    <small>Mejora la visibilidad del texto</small>
                  </div>
                </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="high-contrast"
                    checked={settings.highContrast}
                    onChange={toggleHighContrast}
                    aria-label="Activar alto contraste"
                  />
                </div>
              </div>

              {/* Texto grande */}
              <div className="accessibility-option">
                <label htmlFor="large-text" className="option-label">
                  <span className="option-icon">🔤</span>
                  <div className="option-info">
                    <strong>Texto grande</strong>
                    <small>Aumenta el tamaño de la fuente</small>
                  </div>
                </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="large-text"
                    checked={settings.largeText}
                    onChange={toggleLargeText}
                    aria-label="Activar texto grande"
                  />
                </div>
              </div>

              {/* Movimiento reducido */}
              <div className="accessibility-option">
                <label htmlFor="reduced-motion" className="option-label">
                  <span className="option-icon">⚡</span>
                  <div className="option-info">
                    <strong>Reducir movimiento</strong>
                    <small>Minimiza animaciones</small>
                  </div>
                </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="reduced-motion"
                    checked={settings.reducedMotion}
                    onChange={toggleReducedMotion}
                    aria-label="Activar movimiento reducido"
                  />
                </div>
              </div>

              {/* Botón resetear */}
              <div className="accessibility-reset">
                <button
                  className="btn btn-sm btn-outline-secondary w-100"
                  onClick={() => {
                    resetSettings();
                    setIsOpen(false);
                  }}
                  aria-label="Restablecer configuración de accesibilidad"
                >
                  Restablecer configuración
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
