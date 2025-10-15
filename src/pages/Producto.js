// src/pages/Producto.js
import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import productos from '../data/productos';
import './Home.css';

export default function Producto() {
  const { code } = useParams();

  // Asegura comparación por string
  const producto = useMemo(
    () => productos.find((p) => String(p.codigo) === String(code)),
    [code]
  );

  useEffect(() => {
    document.title = producto
      ? `${producto.nombre} | Pastelería 1000 Sabores`
      : 'Producto no encontrado | Pastelería 1000 Sabores';
  }, [producto]);

  if (!producto) {
    return (
      <main className="container py-4">
        <div className="alert alert-warning">
          Producto no encontrado.{' '}
          <Link to="/productos" className="alert-link">
            Volver al catálogo
          </Link>
          .
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Encabezado / breadcrumb */}
      <header className="bg-rose-subtle border-bottom">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/productos">Productos</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {producto.nombre}
              </li>
            </ol>
          </nav>
          <h1 className="brand-font text-choco h2 mb-0">{producto.nombre}</h1>
          {producto.categoria && (
            <p className="text-muted mb-0">{producto.categoria}</p>
          )}
        </div>
      </header>

      {/* Detalle */}
      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="ratio ratio-4x3 bg-light rounded shadow-sm d-flex align-items-center justify-content-center">
              {producto.imagen ? (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid rounded"
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              ) : (
                <span className="text-muted">Sin imagen</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h2 className="h4">{producto.nombre}</h2>
            {producto.categoria && (
              <p className="text-muted">{producto.categoria}</p>
            )}
            {producto.descripcion && <p>{producto.descripcion}</p>}

            <ul className="list-unstyled small text-muted">
              <li>
                <strong>Stock:</strong>{' '}
                {Number.isFinite(producto.stock) ? `${producto.stock} unidades` : '—'}
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3 mt-3">
              <strong className="fs-4 text-choco">
                ${Number(producto.precio).toLocaleString('es-CL')}
              </strong>
              <button className="btn btn-choco">Añadir al carrito</button>
            </div>

            <div className="mt-3">
              <Link to="/productos" className="btn btn-outline-choco">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
