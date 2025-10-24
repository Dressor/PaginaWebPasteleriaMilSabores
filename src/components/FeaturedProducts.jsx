// src/components/FeaturedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import productos from '../data/productos';
import { useCart } from '../context/CartContext';

export default function FeaturedProducts() {
  const { addToCart, fmtCLP } = useCart();
  const destacados = productos.slice(0, 6); // top 6

  return (
    <section className="container py-5">
      <h2 className="brand-font text-choco mb-3">Productos destacados</h2>
      <div className="row g-4">
        {destacados.map(prod => (
          <div className="col-12 col-sm-6 col-md-4" key={prod.codigo}>
            <div className="card h-100 shadow-sm">
              <div className="ratio ratio-1x1 bg-light">
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="img-fluid rounded-top"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{prod.nombre}</h5>
                <p className="text-muted small mb-2">{prod.categoria}</p>
                <p className="card-text flex-grow-1">{(prod.descripcion || '').slice(0, 110)}{(prod.descripcion || '').length > 110 ? '…' : ''}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <strong className="text-choco">{fmtCLP(prod.precio)}</strong>
                  <div className="d-flex gap-2">
                    <Link to={`/producto/${prod.codigo}`} className="btn btn-outline-choco">Ver</Link>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => addToCart(prod, 1)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
