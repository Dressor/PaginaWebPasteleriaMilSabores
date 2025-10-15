import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const money = (n) => `$${(n || 0).toLocaleString('es-CL')}`;

export default function Carrito() {
  const { items, setQty, removeFromCart, clearCart, subtotal, envio, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="container py-5">
        <div className="text-center">
          <h1 className="brand-font text-choco mb-3">Tu carrito está vacío</h1>
          <p className="text-muted">Explora nuestros productos y agrega tus favoritos.</p>
          <Link to="/productos" className="btn btn-choco mt-2">Ir a Productos</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="section-header border-bottom">
        <div className="container py-4">
          <h1 className="brand-font text-choco mb-1">Tu carrito</h1>
          <p className="text-muted mb-0">Revisa cantidades, elimina productos o finaliza tu compra.</p>
        </div>
      </header>

      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card p-3">
              {items.map(item => (
                <div key={item.codigo} className="d-flex align-items-center gap-3 py-2 border-bottom">
                  <div className="rounded overflow-hidden" style={{ width: 90, height: 70 }}>
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{item.nombre}</div>
                    <div className="text-muted small">{item.categoria}</div>
                    <div className="text-choco fw-bold">{money(item.precio)}</div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={Number.isFinite(item.stock) ? item.stock : undefined}
                      value={item.qty}
                      onChange={(e) => setQty(item.codigo, Number(e.target.value))}
                      className="form-control"
                      style={{ width: 90 }}
                    />
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFromCart(item.codigo)}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-3">
                <Link to="/productos" className="btn btn-outline-choco">Seguir comprando</Link>
                <button className="btn btn-outline-danger" onClick={clearCart}>
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card p-3">
              <h5 className="mb-3">Resumen</h5>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span className="fw-semibold">{money(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envío</span>
                <span className="fw-semibold">{envio === 0 ? 'Gratis' : money(envio)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5">
                <span>Total</span>
                <span className="fw-bold text-choco">{money(total)}</span>
              </div>
              <button className="btn btn-choco w-100 mt-3" onClick={() => alert('🚀 Checkout en construcción')}>
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
