import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerProductoPorCodigo } from '../services/productosService';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

export default function Producto() {
  const { code } = useParams(); // Captura el código de la URL (ej: PA001)
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Usamos la función que busca "manualmente" en la lista para evitar errores 400
    obtenerProductoPorCodigo(code)
      .then(data => {
        if (data) {
          setProducto(data);
          document.title = `${data.nombre} | Pastelería 1000 Sabores`;
        } else {
          setError('Producto no encontrado');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar el producto');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code]);

  if (loading) return (
    <Container className="py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </Container>
  );

  if (error || !producto) return (
    <Container className="py-5 text-center">
      <h3>⚠️ {error || "Producto no encontrado"}</h3>
      <Link to="/productos" className="btn btn-primary mt-3">Volver al catálogo</Link>
    </Container>
  );

  return (
    <Container className="py-5">
      <Link to="/productos" className="btn btn-outline-secondary mb-4">
        &larr; Volver al catálogo
      </Link>
      
      <Row>
        <Col md={6} className="mb-4">
            <Card className="border-0 shadow-sm overflow-hidden">
                <div style={{ maxHeight: '500px', backgroundColor: '#f8f9fa' }}>
                  {/* CORRECCIÓN: Usamos imagenBase64 directamente */}
                  <img
                    src={producto.imagenBase64 || "https://via.placeholder.com/600x400?text=Sin+Imagen"}
                    alt={producto.nombre}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: 'contain' }} // contain para ver la foto completa, cover para llenar
                  />
                </div>
            </Card>
        </Col>
        
        <Col md={6}>
          <h1 className="display-5 fw-bold text-choco mb-2">{producto.nombre}</h1>
          <p className="text-muted small mb-3">Código: {producto.codigo}</p>
          
          <div className="mb-4">
            {producto.categoria && <Badge bg="secondary" className="me-2 fs-6">{producto.categoria}</Badge>}
            <span className="h3 text-primary fw-bold">${Number(producto.precio).toLocaleString('es-CL')}</span>
          </div>
          
          <h5 className="mb-3">Descripción</h5>
          <p className="lead text-muted mb-5" style={{ fontSize: '1.1rem' }}>
            {producto.descripcion || "Sin descripción disponible para este producto."}
          </p>
          
          <div className="d-grid gap-2 col-lg-8 mx-auto mx-lg-0">
            <Button 
                variant="primary" 
                size="lg" 
                className="btn-choco py-3"
                onClick={() => addToCart(producto, 1)}
            >
              <i className="bi bi-cart-plus me-2"></i> Agregar al Carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}