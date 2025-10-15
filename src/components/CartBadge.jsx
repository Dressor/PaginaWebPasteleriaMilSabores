// src/components/CartBadge.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((a, it) => a + (it.qty || 0), 0);

  return (
    <Link to="/carrito" className="btn position-relative" aria-label="Ir al carrito">
      <i className="bi bi-cart3" />
      {count > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {count}
        </span>
      )}
    </Link>
  );
}
