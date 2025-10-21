// src/pages/Home.js
import React, { useEffect, useMemo } from 'react';
import HeroSlider from '../components/HeroSlider';
// Si ya no ocuparás FeaturedProducts, puedes borrar esta import
// import FeaturedProducts from '../components/FeaturedProducts';

import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import productosData from '../data/productos';

export default function Home() {
  useEffect(() => { document.title = 'Inicio | Pastelería 1000 Sabores'; }, []);

  // 1) Toma solo los destacados (o los primeros 9 si no hay flag)
  const productosDestacados = useMemo(() => {
    const conFlag = productosData.filter(p => p.destacado);
    const base = conFlag.length ? conFlag : productosData;
    return base.slice(0, 9);
  }, []);

  // 2) Agrupa en chunks de 3 para cada slide del carrusel
  const productosEnGrupos = useMemo(() => {
    const size = 3;
    const grupos = [];
    for (let i = 0; i < productosDestacados.length; i += size) {
      grupos.push(productosDestacados.slice(i, i + size));
    }
    return grupos;
  }, [productosDestacados]);

  return (
    <>
      <HeroSlider />

      <section className="container py-5">
        <h1 className="brand-font text-choco mb-3">Bienvenido a Pastelería 1000 Sabores</h1>
        <p className="lead">
          Somos una pastelería artesanal con más de 50 años de tradición. Elaboramos tortas,
          postres y productos personalizados con ingredientes seleccionados y el cariño de siempre.
        </p>

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

      {/* 👉 Productos destacados con carrusel en grupos de 3 */}
      <main className="py-5">
        <Container>
          <h2 className="mb-4 brand-font text-choco">Productos destacados</h2>

          <Carousel interval={7000} pause="hover">
            {productosEnGrupos.map((grupo, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4 p-3 p-sm-4 p-md-5">
                  {grupo.map((producto) => (
                    <Col md={4} key={producto.codigo}>
                      <Card className="h-100 shadow-sm">
                        <Card.Img
                          variant="top"
                          src={producto.imagen}
                          alt={producto.nombre}
                          style={{ height: '200px', objectFit: 'cover' }}
                          onError={(e) => { e.currentTarget.src = '/assets/placeholder.jpg'; }}
                        />
                        <Card.Body>
                          <Card.Title className="fw-semibold">{producto.nombre}</Card.Title>
                          <Card.Text className="text-muted" style={{ minHeight: 48 }}>
                            {producto.descripcion}
                          </Card.Text>
                          <Button className="btn-choco">
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
