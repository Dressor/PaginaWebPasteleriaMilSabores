// src/pages/Carrito.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
  const navigate = useNavigate();
  const {
    items, addToCart, removeFromCart, setQty, clearCart,
    fmtCLP, fechaEntrega, setFechaEntrega, cupon, applyCupon,
    getPricing, validarOrden
  } = useCart();
  const { currentUser } = useAuth();

  const [cuponMsg, setCuponMsg] = useState('');
  // Local input para el cupón: no actualiza el contexto hasta presionar "Aplicar"
  const [cuponInput, setCuponInput] = useState(cupon || '');
  const [mensajeOk, setMensajeOk] = useState('');
  const [errores, setErrores] = useState([]);

  const pricing = useMemo(() => getPricing({ allowCupon: !!currentUser }), [getPricing, currentUser]);

  // Si el usuario no está logueado y hay un cupón escrito, opcional: mantener pero avisar
  useEffect(() => {
    if (!currentUser && cupon) {
      // No lo borramos automáticamente, solo informamos vía mensaje si intenta aplicar/confirmar
      setCuponMsg('Los cupones requieren iniciar sesión. Puedes seguir como invitado sin descuento.');
    }
  }, [currentUser]);

  const onApplyCupon = () => {
    if (!currentUser) {
      setCuponMsg('Debes iniciar sesión o registrarte para aplicar cupones.');
      return;
    }
    const code = (cuponInput || '').trim().toUpperCase();
    if (!code) {
      setCuponMsg('Ingresa un código de cupón.');
      return;
    }
    // Validación rápida en cliente antes de aplicar
    const ok = /^(SABOR10|PASTEL15|DUOC20)$/i.test(code);
    if (ok) {
      applyCupon(code);
      setCuponMsg('✅ Cupón aplicado con éxito.');
    } else {
      // No aplicamos el cupón inválido al contexto
      setCuponMsg('❌ Cupón inválido o expirado.');
    }
  };

  const onConfirmar = () => {
    const errs = validarOrden({ allowCupon: !!currentUser });
    setErrores(errs);
    setMensajeOk('');
    if (errs.length === 0) {
      // Navegar al checkout para completar pago/envío
      navigate('/checkout');
    }
  };

  return (
    <div className="container py-4">
      <header className="section-header mb-4 p-3 rounded">
        <h1 className="brand-font mb-1">Tu carrito</h1>
        <p className="text-muted mb-0">Revisa tus productos, aplica cupones y programa tu entrega.</p>
      </header>

      <div className="row g-4">
        {/* Lista de items */}
        <div className="col-12 col-lg-8">
          <div className="card p-3">
            {items.length === 0 ? (
              <div className="text-center py-4">
                <p className="mb-3">Tu carrito está vacío.</p>
                <Link className="btn btn-outline-choco" to="/productos">Ir al catálogo</Link>
              </div>
            ) : (
              <>
                {items.map(it => (
                  <div className="d-flex gap-3 align-items-center py-2 border-bottom" key={it.codigo}>
                    <div className="ratio ratio-1x1" style={{ width: 72 }}>
                      <img
                        src={it.imagen}
                        alt={it.nombre}
                        className="rounded"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{it.nombre}</div>
                      <div className="text-muted small">{fmtCLP(it.precio)}</div>
                      {Number.isFinite(it.stock) && (
                        <div className="small text-muted">Stock: {it.stock}</div>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-light" onClick={() => removeFromCart(it.codigo, 1)}>-</button>
                      <input
                        type="number"
                        min={1}
                        className="form-control"
                        style={{ width: 72 }}
                        value={it.qty}
                        onChange={e => setQty(it.codigo, Number(e.target.value || 0))}
                      />
                      <button className="btn btn-light" onClick={() => addToCart(it, 1)}>+</button>
                    </div>
                    <div style={{ width: 120 }} className="text-end fw-semibold">
                      {fmtCLP((it.precio || 0) * (it.qty || 0))}
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between pt-3">
                  <Link className="btn btn-outline-choco" to="/productos">Seguir comprando</Link>
                  <button className="btn btn-light" onClick={clearCart}>Vaciar carrito</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Resumen / fecha / cupón */}
        <div className="col-12 col-lg-4">
          <div className="card p-3">
            <h5 className="mb-3">Entrega</h5>
            <label className="form-label">Fecha de entrega</label>
            <input
              type="date"
              className="form-control mb-2"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
            />
            <div className="text-muted small mb-3">
              * Debe ser con al menos <strong>24 horas</strong> de anticipación. No entregamos los <strong>domingos</strong>.
            </div>

            <hr />

            <h5 className="mt-2">Cupón de descuento</h5>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Ej: SABOR10"
                value={cuponInput}
                onChange={(e) => setCuponInput((e.target.value || '').toUpperCase())}
                disabled={!currentUser}
              />
              <button
                className="btn btn-outline-choco"
                onClick={() => {
                  // Al presionar Aplicar pasamos el valor al contexto mediante applyCupon
                  onApplyCupon();
                }}
                disabled={!currentUser}
              >Aplicar</button>
            </div>
            {(!currentUser) && (
              <div className="small mb-2">
                Solo usuarios registrados pueden usar cupones. Puedes
                {' '}<Link to="/login">iniciar sesión</Link> o{' '}
                <Link to="/registro">registrarte</Link>, o seguir como invitado sin descuento.
              </div>
            )}
            {cuponMsg && <div className="small mb-3">{cuponMsg}</div>}

            <hr />

            <h5 className="mt-2">Resumen</h5>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>{fmtCLP(pricing.subtotal)}</strong>
            </div>

            {pricing.descuentos.length > 0 && (
              <div className="mt-2">
                {pricing.descuentos.map(d => (
                  <div className="d-flex justify-content-between text-success" key={d.key}>
                    <span>{d.label}</span>
                    <span>-{fmtCLP(d.amount)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between mt-2 fs-5">
              <span>Total</span>
              <strong className="text-choco">{fmtCLP(pricing.total)}</strong>
            </div>

            {errores.length > 0 && (
              <div className="alert alert-warning mt-3 mb-0">
                <ul className="mb-0">
                  {errores.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
            {mensajeOk && (
              <div className="alert alert-success mt-3 mb-0">{mensajeOk}</div>
            )}

            <button className="btn btn-choco w-100 mt-3" onClick={onConfirmar}>
              Confirmar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
