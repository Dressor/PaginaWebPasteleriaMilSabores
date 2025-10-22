// src/pages/Carrito.jsx
/**
 * Página del carrito de compras.
 * Permite ver productos, ajustar cantidades, aplicar cupones,
 * seleccionar fecha de entrega y confirmar la compra.
 * 
 * @component
 * @returns {JSX.Element} Vista completa del carrito de compras
 */
import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function Carrito() {
  const {
    items, addToCart, removeFromCart, setQty, clearCart,
    fmtCLP, fechaEntrega, setFechaEntrega, cupon, setCupon,
    getPricing, validarOrden
  } = useCart();

  // Estados locales para mensajes y errores
  const [cuponMsg, setCuponMsg] = useState('');
  const [mensajeOk, setMensajeOk] = useState('');
  const [errores, setErrores] = useState([]);

  /**
   * Calcula la fecha mínima de entrega (próximo día hábil).
   * Reglas:
   * - No se entrega los domingos (día 0)
   * - Fecha mínima es mañana como mínimo
   * - Si mañana es domingo, se salta al lunes
   * - Si hoy es sábado, la entrega mínima es lunes
   */
  const minDate = useMemo(() => {
    const hoy = new Date();
    let proximaEntrega = new Date(hoy);
    proximaEntrega.setDate(hoy.getDate() + 1); // Mañana como mínimo
    
    // Si mañana es domingo (0), avanzar al lunes (1)
    if (proximaEntrega.getDay() === 0) {
      proximaEntrega.setDate(proximaEntrega.getDate() + 1);
    }
    
    // Formato local sin zona horaria
    const year = proximaEntrega.getFullYear();
    const month = String(proximaEntrega.getMonth() + 1).padStart(2, '0');
    const day = String(proximaEntrega.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }, []);

  /**
   * Genera mensaje descriptivo de la fecha mínima según el día actual
   */
  const mensajeFechaMinima = useMemo(() => {
    const hoy = new Date();
    let proximaEntrega = new Date(hoy);
    proximaEntrega.setDate(hoy.getDate() + 1);
    
    // Si mañana es domingo, avanzar al lunes
    if (proximaEntrega.getDay() === 0) {
      proximaEntrega.setDate(proximaEntrega.getDate() + 1);
    }
    
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/Santiago'
    };
    const fechaFormateada = proximaEntrega.toLocaleDateString('es-CL', opciones);

    const diaHoy = hoy.getDay();
    if (diaHoy === 6) { // Sábado
      return `La entrega mínima es el ${fechaFormateada} (no entregamos domingos).`;
    } else {
      return `La entrega mínima es ${fechaFormateada}.`;
    }
  }, []);

  // Calcular pricing (memoizado para optimización)
  const pricing = useMemo(() => getPricing(), [getPricing]);

  /**
   * Valida y aplica un cupón de descuento.
   * Proporciona feedback inmediato al usuario.
   */
  const onApplyCupon = () => {
    if (!cupon) {
      setCuponMsg('⚠️ Ingresa un código de cupón.');
      return;
    }
    // La validación real se hace en el Context; acá solo damos feedback rápido
    const ok = /^(SABOR10|PASTEL15|DUOC20)$/i.test(cupon);
    setCuponMsg(ok ? '✅ Cupón aplicado con éxito.' : '❌ Cupón inválido o expirado.');
  };

  /**
   * Confirma la orden y valida todos los campos requeridos.
   * Muestra errores si hay problemas o mensaje de éxito si todo está correcto.
   * Lanza confetti si la validación es exitosa.
   */
  const onConfirmar = () => {
    const errs = validarOrden();
    setErrores(errs);
    setMensajeOk('');
    
    if (errs.length === 0) {
      // 🎉 Lanzar confetti desde múltiples direcciones
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confetti desde la izquierda
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        
        // Confetti desde la derecha
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      setMensajeOk('🎉 ¡Compra validada! Te enviaremos la confirmación a tu correo.');
      // En producción, aquí se dispararía el flujo real de pago/API
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
                    
                    {/* Control de cantidad mejorado */}
                    <div className="d-flex align-items-center gap-2">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => removeFromCart(it.codigo, 1)}
                        aria-label="Reducir cantidad"
                        disabled={it.qty <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="form-control text-center"
                        style={{ width: 60 }}
                        value={it.qty}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          setQty(it.codigo, Number(val || 1));
                        }}
                        aria-label="Cantidad"
                      />
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => addToCart(it, 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
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
              min={minDate}
              aria-label="Fecha de entrega"
              aria-describedby="fecha-help"
            />
            <div id="fecha-help" className="text-muted small mb-3">
              ℹ️ {mensajeFechaMinima}
            </div>

            <hr />

            <h5 className="mt-2">Cupón de descuento</h5>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Ej: SABOR10"
                value={cupon}
                onChange={(e) => setCupon((e.target.value || '').toUpperCase())}
              />
              <button className="btn btn-outline-choco" onClick={onApplyCupon}>Aplicar</button>
            </div>
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

            {pricing.descuentos.length > 0 && (
              <div className="d-flex justify-content-between mt-2 pt-2 border-top">
                <span>Subtotal con descuento</span>
                <strong>{fmtCLP(pricing.subtotalConDescuento)}</strong>
              </div>
            )}

            <div className="d-flex justify-content-between mt-2">
              <span>IVA (19%)</span>
              <span>{fmtCLP(pricing.iva)}</span>
            </div>

            <div className="d-flex justify-content-between mt-2 pt-2 border-top fs-5">
              <span className="fw-bold">Total</span>
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
