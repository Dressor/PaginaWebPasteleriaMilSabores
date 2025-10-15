// src/components/CartBadge.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartBadge() {
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn position-relative btn-outline-secondary"
      title="Ver carrito"
      onClick={() => navigate('/carrito')}
    >
      🛒 Carrito
      {count > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          aria-label={`Productos en carrito: ${count}`}
        >
          {count}
          <span className="visually-hidden">productos</span>
        </span>
      )}
    </button>
  );
}
