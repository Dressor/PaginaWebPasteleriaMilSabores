// src/components/CartToasts.jsx
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

export default function CartToasts() {
  const { toasts, removeToast } = useCart();

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
      {toasts.map(t => (
        <Toast key={t.id} onClose={() => removeToast(t.id)} delay={2200} autohide>
          <Toast.Header>
            <strong className="me-auto">{t.title}</strong>
            <small>ahora</small>
          </Toast.Header>
          <Toast.Body>{t.msg}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
