// src/pages/Checkout.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutLoading from '../components/CheckoutLoading';

function luhnCheck(num) {
  const s = (num || '').replace(/\D/g, '');
  if (!s) return false;
  let sum = 0; let shouldDouble = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let digit = parseInt(s[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) === 0;
}

function isValidExpiry(mmYY) {
  if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(mmYY || '')) return false;
  const [mm, yy] = mmYY.split('/');
  const month = parseInt(mm, 10);
  const year = 2000 + parseInt(yy, 10);
  const now = new Date();
  const exp = new Date(year, month); // first day of month+1
  return exp > now;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getPricing, fmtCLP, clearCart, fechaEntrega } = useCart();
  const { currentUser, saveOrder } = useAuth();

  const pricing = useMemo(() => getPricing({ allowCupon: !!currentUser }), [getPricing, currentUser]);

  const [envio, setEnvio] = useState({
    nombre: currentUser?.nombre || '',
    email: currentUser?.email || '',
    telefono: '',
    direccion: '',
    ciudad: '',
    region: '',
    comuna: '',
    notas: ''
  });
  const [metodo, setMetodo] = useState('tarjeta'); // 'tarjeta' | 'transferencia'
  const [tarjeta, setTarjeta] = useState({
    titular: currentUser?.nombre || '',
    numero: '',
    vencimiento: '',
    cvc: ''
  });
  const [transferOk, setTransferOk] = useState(false);
  const [errores, setErrores] = useState([]);
  const [okMsg, setOkMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) {
      // Sin items, no hay checkout
      navigate('/carrito');
    }
  }, [items, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = [];

    // Validación envío
    if (!envio.nombre.trim()) errs.push('Ingresa tu nombre.');
    if (!envio.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.push('Ingresa un correo válido.');
    if (!envio.telefono.match(/^[\d\s+()-]{7,}$/)) errs.push('Ingresa un teléfono válido.');
    if (!envio.direccion.trim()) errs.push('Ingresa tu dirección.');
    if (!envio.ciudad.trim()) errs.push('Ingresa tu ciudad.');
    if (!envio.region.trim()) errs.push('Ingresa tu región.');
    if (!envio.comuna.trim()) errs.push('Ingresa tu comuna.');

    // Validación pago
    if (metodo === 'tarjeta') {
      const numberDigits = (tarjeta.numero || '').replace(/\s+/g, '');
      if (!tarjeta.titular.trim()) errs.push('Ingresa el nombre del titular.');
      if (!luhnCheck(numberDigits)) errs.push('Número de tarjeta inválido.');
      if (!isValidExpiry(tarjeta.vencimiento)) errs.push('Vencimiento inválido (MM/YY).');
      if (!/^\d{3,4}$/.test(tarjeta.cvc || '')) errs.push('CVC inválido.');
    } else if (metodo === 'transferencia') {
      if (!transferOk) errs.push('Confirma que realizaste la transferencia.');
    }

    setErrores(errs);
    setOkMsg('');

    if (errs.length === 0) {
      // Simulación de pasarela
      const orderData = {
        id: `PMS-${Date.now().toString().slice(-8)}`,
        fecha: new Date().toLocaleDateString('es-CL'),
        hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        metodo: metodo === 'tarjeta' ? 'Tarjeta de crédito/débito' : 'Transferencia bancaria',
        total: pricing.total,
        totalFormatted: fmtCLP(pricing.total),
        fechaEntrega,
        envio,
        items: items.map(it => ({
          codigo: it.codigo,
          nombre: it.nombre,
          qty: it.qty,
          precio: it.precio,
          total: fmtCLP((it.precio || 0) * (it.qty || 0))
        }))
      };

      // Guardar pedido en el historial del usuario (si está logueado)
      if (currentUser) {
        saveOrder(orderData);
      }

      // Mostrar pantalla de procesamiento/validación antes de confirmar
      setIsProcessing(true);
      setOkMsg('Procesando pago...');
      const PROCESSING_MS = 2500; // Duración simulada de la pasarela

      setTimeout(() => {
        setIsProcessing(false);
        // Vaciar carrito y navegar a página de éxito
        clearCart();
        navigate('/checkout/exito', { state: { order: orderData } });
      }, PROCESSING_MS);
    }
  };

  return (
    <div className="container py-4">
      <CheckoutLoading visible={isProcessing} />
      <header className="section-header rounded mb-4">
        <div className="container py-3">
          <h1 className="brand-font text-choco mb-1">Checkout</h1>
          <p className="text-muted mb-0">Ingresa tus datos de envío y método de pago.</p>
        </div>
      </header>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <form onSubmit={onSubmit} className="card p-3">
            <h5 className="mb-3">Datos de envío</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre completo</label>
                <input className="form-control" value={envio.nombre} onChange={(e)=>setEnvio({...envio, nombre:e.target.value})} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Correo</label>
                <input type="email" className="form-control" value={envio.email} onChange={(e)=>setEnvio({...envio, email:e.target.value})} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input className="form-control" placeholder="+56 9 1234 5678" value={envio.telefono} onChange={(e)=>setEnvio({...envio, telefono:e.target.value})} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha de entrega</label>
                <input className="form-control" value={fechaEntrega || ''} disabled />
              </div>
              <div className="col-12">
                <label className="form-label">Dirección</label>
                <input className="form-control" value={envio.direccion} onChange={(e)=>setEnvio({...envio, direccion:e.target.value})} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Ciudad</label>
                <input className="form-control" value={envio.ciudad} onChange={(e)=>setEnvio({...envio, ciudad:e.target.value})} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Región</label>
                <input className="form-control" value={envio.region} onChange={(e)=>setEnvio({...envio, region:e.target.value})} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Comuna</label>
                <input className="form-control" value={envio.comuna} onChange={(e)=>setEnvio({...envio, comuna:e.target.value})} required />
              </div>
              <div className="col-12">
                <label className="form-label">Notas (opcional)</label>
                <textarea className="form-control" rows={2} value={envio.notas} onChange={(e)=>setEnvio({...envio, notas:e.target.value})} />
              </div>
            </div>

            <hr className="my-4" />

            <h5 className="mb-3">Pago</h5>
            <div className="mb-3 d-flex gap-3 flex-wrap">
              <label className="form-check">
                <input type="radio" className="form-check-input" name="metodo" value="tarjeta" checked={metodo==='tarjeta'} onChange={()=>setMetodo('tarjeta')} />
                <span className="ms-2">Tarjeta (simulación Webpay)</span>
              </label>
              <label className="form-check">
                <input type="radio" className="form-check-input" name="metodo" value="transferencia" checked={metodo==='transferencia'} onChange={()=>setMetodo('transferencia')} />
                <span className="ms-2">Transferencia bancaria</span>
              </label>
            </div>

            {metodo === 'tarjeta' ? (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Titular de la tarjeta</label>
                  <input className="form-control" value={tarjeta.titular} onChange={(e)=>setTarjeta({...tarjeta, titular:e.target.value})} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Número de tarjeta</label>
                  <input className="form-control" inputMode="numeric" maxLength={19} placeholder="4111 1111 1111 1111" value={tarjeta.numero} onChange={(e)=>{
                    let v = e.target.value.replace(/[^\d]/g, '').slice(0,16);
                    v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setTarjeta({...tarjeta, numero:v});
                  }} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Vencimiento (MM/YY)</label>
                  <input className="form-control" placeholder="MM/YY" maxLength={5} value={tarjeta.vencimiento} onChange={(e)=>{
                    let v = e.target.value.replace(/[^\d]/g, '').slice(0,4);
                    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
                    setTarjeta({...tarjeta, vencimiento:v});
                  }} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">CVC</label>
                  <input className="form-control" inputMode="numeric" maxLength={4} value={tarjeta.cvc} onChange={(e)=>{
                    const v = e.target.value.replace(/[^\d]/g, '').slice(0,4);
                    setTarjeta({...tarjeta, cvc:v});
                  }} required />
                </div>
              </div>
            ) : (
              <div className="alert alert-light" role="status">
                <div className="mb-2">Realiza una transferencia a:</div>
                <ul className="mb-2">
                  <li><strong>Banco:</strong> Banco Educativo</li>
                  <li><strong>Cuenta:</strong> 12-345-6789-0</li>
                  <li><strong>Tipo:</strong> Cuenta Corriente</li>
                  <li><strong>RUT:</strong> 12.345.678-9</li>
                  <li><strong>Titular:</strong> Pastelería 1000 Sabores</li>
                  <li><strong>Email:</strong> pagos@1000sabores.cl</li>
                </ul>
                <label className="form-check">
                  <input type="checkbox" className="form-check-input" checked={transferOk} onChange={(e)=>setTransferOk(e.target.checked)} />
                  <span className="ms-2">Ya realicé la transferencia</span>
                </label>
              </div>
            )}

            {errores.length > 0 && (
              <div className="alert alert-warning mt-3">
                <ul className="mb-0">
                  {errores.map((e,i)=> <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
            {okMsg && <div className="alert alert-success mt-3">{okMsg}</div>}

            <div className="d-flex justify-content-between mt-3">
              <Link className="btn btn-outline-choco" to="/carrito">Volver</Link>
              <button className="btn btn-choco" type="submit">Pagar ahora</button>
            </div>
          </form>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card p-3">
            <h5 className="mb-3">Resumen</h5>
            <div className="d-flex justify-content-between"><span>Subtotal</span><strong>{fmtCLP(pricing.subtotal)}</strong></div>
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
            <div className="d-flex justify-content-between mt-2 fs-5"><span>Total</span><strong className="text-choco">{fmtCLP(pricing.total)}</strong></div>

            <hr />
            <h6 className="mb-1">Productos</h6>
            <ul className="list-unstyled small mb-0">
              {items.map(it => (
                <li key={it.codigo} className="d-flex justify-content-between">
                  <span>{it.nombre} × {it.qty}</span>
                  <span>{fmtCLP((it.precio||0) * (it.qty||0))}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
