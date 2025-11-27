// src/pages/Home.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import { Container, Row, Col, Card, Carousel, Button, Alert } from 'react-bootstrap';
import { obtenerProductos } from "../services/productosService";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = 'Inicio | Pastelería 1000 Sabores';

    obtenerProductos().then(data => {
      setProductos(data);
    });
  }, []);

  const productosDestacados = useMemo(() => {
    const conFlag = productos.filter(p => p.destacado);
    const base = conFlag.length ? conFlag : productos;
    return base.slice(0, 9);
  }, [productos]);

  const productosEnGrupos = useMemo(() => {
    const size = 3;
    const grupos = [];
    for (let i = 0; i < productosDestacados.length; i += size) {
      grupos.push(productosDestacados.slice(i, i + size));
    }
    return grupos;
  }, [productosDestacados]);

  useEffect(() => {
    if (productosDestacados.length) {
      setSelected(productosDestacados[0].codigo);
    }
  }, [productosDestacados]);

  return (
    <>
      <HeroSlider />

      <section className="container py-5">
        <h1 className="brand-font text-choco mb-3">Bienvenido a Pastelería 1000 Sabores</h1>
        <p className="lead">
          Somos una pastelería artesanal con más de 50 años de tradición.
        </p>

        {!currentUser && (
          <Alert variant="light" className="d-flex justify-content-between mt-3 shadow-sm">
            <span>¿Aún no tienes cuenta? Regístrate en segundos.</span>
            <a href="/registro" className="btn btn-choco">Registrarse</a>
          </Alert>
        )}
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
                        onClick={() => navigate(`/producto/${producto.codigo}`)}
                      >
                        <Card.Img
                          variant="top"
                          src={`http://localhost:8082/api/v1/archivos/${producto.archivoImagenId}`}
                          alt={producto.nombre}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                          <Card.Title>{producto.nombre}</Card.Title>
                          <Card.Text>{producto.descripcion}</Card.Text>
                          <Button
                            className="btn-choco"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(producto, 1);
                            }}
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
