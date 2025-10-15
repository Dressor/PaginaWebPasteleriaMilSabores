import React from 'react';
import { useCart } from '../context/CartContext';

// Estilos mínimos inline para fijar el contenedor en la esquina
const wrapStyle = {
  position: 'fixed',
  top: 12,
  right: 12,
  zIndex: 1080,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const variantClass = (v) => {
  switch (v) {
    case 'success': return 'bg-success text-white';
    case 'warning': return 'bg-warning';
    case 'danger':  return 'bg-danger text-white';
    default:        return 'bg-dark text-white';
  }
};

export default function CartToasts() {
  const { toasts, removeToast } = useCart();
  const list = Array.isArray(toasts) ? toasts : []; // ← evita undefined

  if (list.length === 0) return null;

  return (
    <div style={wrapStyle} aria-live="polite" aria-atomic="true">
      {list.map(t => (
        <div
          key={t.id}
          className={`toast show ${variantClass(t.variant)}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ minWidth: 260 }}
        >
          <div className="d-flex align-items-center justify-content-between px-3 py-2">
            <div className="me-3">{t.msg}</div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => removeToast(t.id)}
              aria-label="Cerrar"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
