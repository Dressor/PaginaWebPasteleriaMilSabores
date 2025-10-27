import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productos from '../data/productos';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import './Home.css';

export default function Producto() {
  const { code } = useParams();
  const { addToCart, items } = useCart();
  const producto = productos.find(p => p.codigo === code);

  const [base, setBase] = useState('biscocho');
  const [sabor, setSabor] = useState('chocolate');
  // Permite que la selección de personas en el pedido personalizado afecte el precio
  const [personas, setPersonas] = useState(10);

  // Precios para torta personalizada según cantidad de personas
  const PERSONAL_PRICES = {
    10: 15990,
    15: 20990,
    20: 25990,
  };

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
              {producto.imagen ? (
                <img
                  src={producto.imagen}
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
                ${((producto.codigo === 'personalizado') ? (PERSONAL_PRICES[personas] || producto.precio) : producto.precio).toLocaleString('es-CL')}
              </strong>
              <button
                className="btn btn-choco"
                onClick={() => addToCart(producto, 1)}
                disabled={atLimit}
              >
                {atLimit ? 'Sin stock' : 'Añadir al carrito'}
              </button>
            </div>

            {/* Personalización mínima: sólo para producto 'personalizado' */}
            {producto.codigo === 'personalizado' ? (
              <div className="mt-4">
                <h5>Personaliza tu torta</h5>

                <label className="form-label mt-2">Base</label>
                <select className="form-select mb-2" value={base} onChange={e => setBase(e.target.value)}>
                  <option value="biscocho">Biscocho</option>
                  <option value="hojarasca">Hojarasca</option>
                  <option value="milhojas">Mil Hojas</option>
                  <option value="mixta">Mixta (Biscocho + Hojarasca)</option>
                </select>

                <label className="form-label mt-2">Sabor</label>
                <select className="form-select mb-2" value={sabor} onChange={e => setSabor(e.target.value)}>
                  <option value="chocolate">Chocolate</option>
                  <option value="vainilla">Vainilla</option>
                  <option value="zanahoria">Zanahoria</option>
                  <option value="redvelvet">Red Velvet</option>
                </select>

                <label className="form-label mt-2">Cantidad de personas</label>
                <select className="form-select mb-3" value={personas} onChange={e => setPersonas(Number(e.target.value))}>
                  <option value={10}>10 personas — $15.990</option>
                  <option value={15}>15 personas — $20.990</option>
                  <option value={20}>20 personas — $25.990</option>
                </select>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-choco"
                    onClick={() => {
                      // crear item personalizado único para el carrito
                      const uniqueCode = `${producto.codigo}-${Date.now()}`;
                      const nuevo = {
                        ...producto,
                        codigo: uniqueCode,
                        nombre: `${producto.nombre} (Personalizado)`,
                        precio: (PERSONAL_PRICES[personas] || producto.precio),
                        personalizado: { base, sabor, personas },
                      };
                      addToCart(nuevo, 1);
                    }}
                    disabled={atLimit}
                  >
                    Añadir personalizado al carrito
                  </button>
                  <Link to="/productos" className="btn btn-outline-choco">Volver</Link>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <Link to="/productos" className="btn btn-outline-choco">Volver</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
