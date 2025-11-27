import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import { obtenerProductos } from '../services/productosService';
import './Home.css';

export default function Producto() {
  const { code } = useParams();
  const { addToCart, items } = useCart();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para personalización
  const [base, setBase] = useState('biscocho');
  const [sabor, setSabor] = useState('chocolate');
  const [personas, setPersonas] = useState(10);

  const PERSONAL_PRICES = {
    10: 15990,
    15: 20990,
    20: 25990,
  };

  // 🔥 CARGAR PRODUCTOS DESDE EL BACKEND
  useEffect(() => {
    obtenerProductos().then(data => {
      const encontrado = data.find(p => p.codigo === code);
      setProducto(encontrado || null);
      setLoading(false);
    });
  }, [code]);

  if (loading) {
    return <p className="container py-4">Cargando producto...</p>;
  }

  if (!producto) {
    return (
      <main className="container py-4">
        <div className="alert alert-warning">
          Producto no encontrado. <Link to="/productos" className="alert-link">Volver al listado</Link>.
        </div>
      </main>
    );
  }

  const current = items.find(i => i.codigo === producto.codigo)?.qty || 0;
  const atLimit = Number.isFinite(producto.stock) && current >= producto.stock;

  return (
    <>
      <SectionHeader
        title={producto.nombre}
        subtitle="Detalle del producto seleccionado."
      />

      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="ratio ratio-4x3 bg-light rounded shadow-sm d-flex align-items-center justify-content-center">
              {producto.archivoImagenId ? (
                <img
                  src={`http://localhost:8082/api/v1/archivos/${producto.archivoImagenId}`}
                  alt={producto.nombre}
                  className="img-fluid rounded"
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span className="text-muted">Sin imagen</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h2 className="mb-1">{producto.nombre}</h2>
            <p className="text-muted">{producto.categoria}</p>
            <p>{producto.descripcion}</p>
            <p><strong>Stock:</strong> {Number.isFinite(producto.stock) ? producto.stock : '—'} unidades</p>

            <div className="d-flex align-items-center gap-3">
              <strong className="fs-4 text-choco">
                ${producto.precio.toLocaleString('es-CL')}
              </strong>

              <button
                className="btn btn-choco"
                onClick={() => addToCart(producto, 1)}
                disabled={atLimit}
              >
                {atLimit ? 'Sin stock' : 'Añadir al carrito'}
              </button>
            </div>

            <div className="mt-3">
              <Link to="/productos" className="btn btn-outline-choco">Volver</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
