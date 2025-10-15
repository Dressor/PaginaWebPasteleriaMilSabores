// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-5 text-center">
      <h1 className="display-5 text-choco">404</h1>
      <p className="lead">Ups, la página que buscas no existe.</p>
      <Link to="/productos" className="btn btn-outline-choco">Ir al catálogo</Link>
    </div>
  );
}
