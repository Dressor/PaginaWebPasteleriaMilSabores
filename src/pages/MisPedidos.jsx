// src/pages/MisPedidos.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import productosData from '../data/productos';

export default function MisPedidos() {
  const { currentUser, getUserOrders } = useAuth();
  const { addToCart, clearCart, fmtCLP } = useCart();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [expandido, setExpandido] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const orders = getUserOrders();
    setPedidos(orders);
  }, [currentUser, getUserOrders, navigate]);

  const volverAPedir = (pedido) => {
    if (!pedido.items || pedido.items.length === 0) {
      alert('Este pedido no tiene productos para reordenar.');
      return;
    }

    // Limpiar carrito actual
    clearCart();

    // Agregar cada producto del pedido al carrito
    let agregados = 0;
    pedido.items.forEach(item => {
      // Buscar el producto en el catálogo actual
      const producto = productosData.find(p => p.codigo === item.codigo || p.nombre === item.nombre);
      if (producto) {
        addToCart(producto, item.qty);
        agregados++;
      }
    });

    if (agregados > 0) {
      alert(`Se agregaron ${agregados} producto(s) al carrito.`);
      navigate('/carrito');
    } else {
      alert('No se pudieron agregar los productos. Algunos pueden no estar disponibles.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Mis Pedidos | Pastelería 1000 Sabores</title>
      </Helmet>

      <div className="container py-4">
        <header className="section-header rounded mb-4">
          <div className="container py-3">
            <h1 className="brand-font text-choco mb-1">Mis Pedidos</h1>
            <p className="text-muted mb-0">
              Historial de compras de <strong>{currentUser?.nombre}</strong>
            </p>
          </div>
        </header>

        {pedidos.length === 0 ? (
          <div className="card p-4 text-center">
            <p className="mb-3">Aún no has realizado ningún pedido.</p>
            <Link to="/productos" className="btn btn-choco">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="row g-3">
            {pedidos.map((pedido, idx) => (
              <div className="col-12" key={idx}>
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <h5 className="card-title mb-1">
                          Pedido #{pedido.id}
                        </h5>
                        <div className="small text-muted">
                          {pedido.fecha} {pedido.hora} • {pedido.metodo}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-choco">{pedido.totalFormatted || fmtCLP(pedido.total)}</div>
                        <div className="small text-muted">
                          {pedido.items?.length || 0} producto(s)
                        </div>
                      </div>
                    </div>

                    {pedido.fechaEntrega && (
                      <div className="mt-2 small">
                        <strong>Entrega:</strong> {new Date(pedido.fechaEntrega).toLocaleDateString('es-CL')}
                      </div>
                    )}

                    <div className="mt-3 d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-choco"
                        onClick={() => volverAPedir(pedido)}
                      >
                        🔄 Volver a pedir
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setExpandido(expandido === idx ? null : idx)}
                      >
                        {expandido === idx ? 'Ocultar detalles' : 'Ver detalles'}
                      </button>
                    </div>

                    {expandido === idx && (
                      <div className="mt-3 pt-3 border-top">
                        <h6 className="mb-2">Productos:</h6>
                        <ul className="list-unstyled mb-3">
                          {pedido.items?.map((item, i) => (
                            <li key={i} className="d-flex justify-content-between py-1">
                              <span>{item.nombre} × {item.qty}</span>
                              <span>{item.total}</span>
                            </li>
                          ))}
                        </ul>

                        {pedido.envio && (
                          <>
                            <h6 className="mb-2">Datos de envío:</h6>
                            <div className="small">
                              <div><strong>Nombre:</strong> {pedido.envio.nombre}</div>
                              <div><strong>Email:</strong> {pedido.envio.email}</div>
                              <div><strong>Teléfono:</strong> {pedido.envio.telefono}</div>
                              <div><strong>Dirección:</strong> {pedido.envio.direccion}</div>
                              <div><strong>Comuna:</strong> {pedido.envio.comuna}, {pedido.envio.ciudad}</div>
                              <div><strong>Región:</strong> {pedido.envio.region}</div>
                              {pedido.envio.notas && (
                                <div><strong>Notas:</strong> {pedido.envio.notas}</div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
