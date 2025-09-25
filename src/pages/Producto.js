import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Home.css'; 
import productos from '../data/productos';
import 'bootstrap/dist/css/bootstrap.min.css';

function Producto() {
  const { code } = useParams();
  const producto = productos.find(p => p.codigo === code);

  if (!producto) {
    return (
      <main className="container py-4">
        <div className="alert alert-warning">
          Producto no encontrado. <Link to="/producto" className="alert-link">Volver al listado</Link>.
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="bg-rose-subtle border-bottom">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
              <li className="breadcrumb-item"><Link to="/producto">Productos</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
            </ol>
          </nav>
          <h1 className="brand-font text-choco">{producto.nombre}</h1>
        </div>
      </header>

      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="ratio ratio-4x3 bg-light rounded shadow-sm d-flex align-items-center justify-content-center">
              {producto.imagen ? (
                <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'cover'}} />
              ) : (
                <span className="text-muted">Sin imagen</span>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h2>{producto.nombre}</h2>
            <p className="text-muted">{producto.categoria}</p>
            <p>{producto.descripcion}</p>
            <p><strong>Stock:</strong> {producto.stock} unidades</p>
            <div className="d-flex align-items-center gap-3">
              <strong className="fs-4">${producto.precio.toLocaleString('es-CL')}</strong>
              <button className="btn btn-rose">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Producto;