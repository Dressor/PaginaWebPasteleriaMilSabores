// src/pages/CheckoutExito.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function CheckoutExito() {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Obtener datos de la orden desde el state de navegación
    if (location.state?.order) {
      setOrderData(location.state.order);
    } else {
      // Si no hay datos, generar un orden simple
      const orderId = `PMS-${Date.now().toString().slice(-8)}`;
      setOrderData({
        id: orderId,
        fecha: new Date().toLocaleDateString('es-CL'),
        hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        total: 0,
        metodo: 'No especificado'
      });
    }
  }, [location]);

  const descargarComprobante = () => {
    if (!orderData) return;
    
    // Generar un txt simple con los datos del pedido
    const contenido = `
═══════════════════════════════════════════
  PASTELERÍA 1000 SABORES
  Comprobante de Compra
═══════════════════════════════════════════

Número de pedido: ${orderData.id}
Fecha: ${orderData.fecha}
Hora: ${orderData.hora}
Método de pago: ${orderData.metodo}

───────────────────────────────────────────
Total pagado: ${orderData.totalFormatted || '$' + orderData.total}
───────────────────────────────────────────

Fecha de entrega: ${orderData.fechaEntrega || 'Por confirmar'}

Datos de envío:
${orderData.envio?.nombre || 'No especificado'}
${orderData.envio?.direccion || ''}
${orderData.envio?.comuna || ''}, ${orderData.envio?.ciudad || ''}
${orderData.envio?.region || ''}

${orderData.envio?.notas ? 'Notas: ' + orderData.envio.notas : ''}

───────────────────────────────────────────
Productos:
${orderData.items?.map(it => `  ${it.nombre} x ${it.qty} - ${it.total}`).join('\n') || 'Ver detalle en tu correo'}

───────────────────────────────────────────

¡Gracias por confiar en nosotros!

Pastelería 1000 Sabores
Santiago, Chile
+56 9 8765 4321
contacto@1000sabores.cl

═══════════════════════════════════════════
    `.trim();

    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Comprobante_${orderData.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!orderData) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-choco" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>¡Compra exitosa! | Pastelería 1000 Sabores</title>
      </Helmet>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm text-center p-4">
              <div className="mb-3">
                <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle" style={{ width: 80, height: 80 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="text-success" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                </div>
              </div>

              <h1 className="brand-font text-choco h3 mb-2">¡Compra exitosa!</h1>
              <p className="text-muted mb-4">
                Tu pedido ha sido procesado correctamente. Te enviaremos un correo de confirmación en breve.
              </p>

              <div className="bg-light rounded p-3 mb-4 text-start">
                <div className="row g-2 small">
                  <div className="col-6 text-muted">Número de pedido:</div>
                  <div className="col-6 fw-bold text-end">{orderData.id}</div>
                  <div className="col-6 text-muted">Fecha:</div>
                  <div className="col-6 text-end">{orderData.fecha} {orderData.hora}</div>
                  <div className="col-6 text-muted">Método de pago:</div>
                  <div className="col-6 text-end">{orderData.metodo}</div>
                  <div className="col-6 text-muted">Total pagado:</div>
                  <div className="col-6 fw-bold text-choco text-end">{orderData.totalFormatted || '$' + orderData.total}</div>
                  {orderData.fechaEntrega && (
                    <>
                      <div className="col-6 text-muted">Entrega estimada:</div>
                      <div className="col-6 text-end">{new Date(orderData.fechaEntrega).toLocaleDateString('es-CL')}</div>
                    </>
                  )}
                </div>
              </div>

              <button 
                className="btn btn-outline-choco w-100 mb-3"
                onClick={descargarComprobante}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                </svg>
                Descargar comprobante
              </button>

              <div className="d-flex gap-2">
                <Link to="/" className="btn btn-light flex-fill">Volver al inicio</Link>
                <Link to="/productos" className="btn btn-choco flex-fill">Seguir comprando</Link>
              </div>

              <div className="mt-4 pt-3 border-top small text-muted">
                <p className="mb-1">
                  <strong>¿Tienes dudas?</strong> Contáctanos:
                </p>
                <p className="mb-0">
                  📧 contacto@1000sabores.cl | 📞 +56 9 8765 4321
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
