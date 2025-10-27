import React from 'react';

export default function CheckoutLoading({ visible = false, message = 'Validando información y procesando pago...' }) {
  if (!visible) return null;

  return (
    <div className="checkout-loading-overlay">
      <div className="checkout-loading-card">
        <div className="spinner-border text-choco" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="mt-3">{message}</div>
        <div className="small text-muted mt-2">Esto puede tardar unos segundos. No cierres esta ventana.</div>
      </div>
    </div>
  );
}
