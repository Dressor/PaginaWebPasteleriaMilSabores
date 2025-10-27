// src/pages/Home.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import { Container, Row, Col, Card, Carousel, Button, Alert } from 'react-bootstrap';
import productosData from '../data/productos';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { addToCart, items } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const hoverTimer = useRef(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => { document.title = 'Inicio | Pastelería 1000 Sabores'; }, []);

  const productosDestacados = useMemo(() => {
    const conFlag = productosData.filter(p => p.destacado);
    const base = conFlag.length ? conFlag : productosData;
    return base.slice(0, 9);
  }, []);

  const productosEnGrupos = useMemo(() => {
    const size = 3;
    const grupos = [];
    for (let i = 0; i < productosDestacados.length; i += size) {
      grupos.push(productosDestacados.slice(i, i + size));
    }
    return grupos;
  }, [productosDestacados]);

  // Selección/resaltado similar a Productos: seleccionar el primer producto al montar
  useEffect(() => {
    if (productosDestacados && productosDestacados.length) {
      setSelected(productosDestacados[0].codigo);
    } else {
      setSelected(null);
    }
  }, [productosDestacados]);

  // Nota sobre el carrusel: queremos que el carousel siga rotando aunque el usuario
  // pase el mouse por encima (pause={false}). Decisión UX: la UI destaca la tarjeta
  // con la clase `highlight` al hacer hover pero no detiene la rotación automática.
  // Esto evita que el carrusel quede inmóvil cuando el usuario solo explora visualmente.

  return (
    <>
      <HeroSlider />

      <section className="container py-5">
        <h1 className="brand-font text-choco mb-3">Bienvenido a Pastelería 1000 Sabores</h1>
        <p className="lead">
          Somos una pastelería artesanal con más de 50 años de tradición. Elaboramos tortas,
          postres y productos personalizados con ingredientes seleccionados y el cariño de siempre.
        </p>

        {!currentUser && (
          <div className="mt-3">
            <Alert variant="light" className="d-flex align-items-center justify-content-between shadow-sm" style={{ border: '1px solid var(--border)' }}>
              <span className="me-3">¿Aún no tienes cuenta? Crea la tuya en segundos para un checkout más rápido.</span>
              <a href="/registro" className="btn btn-choco">Registrarse</a>
            </Alert>
          </div>
        )}

        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">🎂 Tradición y sabor</h5>
                <p>Recetas familiares que han pasado de generación en generación.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">🧁 Productos personalizados</h5>
                <p>Creamos tortas y postres a medida para cada ocasión especial.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">☕ Atención cálida</h5>
                <p>Visítanos y vive la experiencia de la repostería tradicional chilena.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-5">
        <Container>
          <h2 className="mb-4 brand-font text-choco">Productos destacados</h2>

          <Carousel interval={7000} pause={false}>
            {productosEnGrupos.map((grupo, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4 p-3 p-sm-4 p-md-5">
                  {grupo.map((producto) => (
                    <Col md={4} key={producto.codigo}>
                      <Card
                        className={`h-100 product-card ${selected === producto.codigo ? 'highlight' : ''}`}
                        onMouseEnter={() => setSelected(producto.codigo)}
                        onClick={(e) => {
                          const tag = e.target && (e.target.tagName || '').toLowerCase();
                          if (tag === 'button' || tag === 'a' || (e.target.closest && e.target.closest('button, a'))) return;
                          navigate(`/producto/${producto.codigo}`);
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={producto.imagen}
                          alt={producto.nombre}
                          onError={(e) => { e.currentTarget.src = '/assets/placeholder.jpg'; }}
                          style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                        />
                        <Card.Body>
                          <Card.Title className="fw-semibold">{producto.nombre}</Card.Title>
                          <Card.Text className="text-muted" style={{ minHeight: 48 }}>
                            {producto.descripcion}
                          </Card.Text>
                          <Button 
                            className="btn-choco"
                            onClick={(e) => { e.stopPropagation(); addToCart(producto, 1); }}
                          >
                            Agregar al carrito
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </main>
    </>
  );
}
