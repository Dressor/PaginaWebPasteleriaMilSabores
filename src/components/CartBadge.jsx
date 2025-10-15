import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartBadge() {
  const { count } = useCart();
  return (
    <Link to="/carrito" className="btn btn-outline-choco position-relative">
      <i className="bi bi-cart3 me-1" />
      Carrito
      {count > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: '0.75rem' }}
          aria-label={`${count} artículos en el carrito`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
