// src/components/CartToasts.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartToasts() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1080, pointerEvents: 'none' }}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast show align-items-center text-white bg-${variantToBg(t.variant)} border-0 mb-2`}
          role="status"
          style={{ pointerEvents: 'auto', minWidth: 300 }}
        >
          <div className="d-flex">
            <div className="toast-body">
              {t.message}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Cerrar"
              onClick={() => removeToast(t.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function variantToBg(variant) {
  switch ((variant || 'success')) {
    case 'success': return 'success';
    case 'warning': return 'warning';
    case 'danger':  return 'danger';
    case 'info':    return 'secondary';
    default:        return 'success';
  }
}
