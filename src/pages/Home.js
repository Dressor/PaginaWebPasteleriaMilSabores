<<<<<<< HEAD
import React from 'react';
import './Home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import productos from '../data/productos'; 
import fotoTienda from '../assets/img/fotoTienda.png';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';

const agruparProductos = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const productosDestacados = productos.slice(0, 9);
const productosEnGrupos = agruparProductos(productosDestacados, 3);

function Home() {
  return (
    <>
      <header className="py-5 bg-rose-subtle border-bottom">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-6">
              <h1 className="display-5 brand-font text-choco">Pastelería 1000 Sabores</h1>
              <p className="lead">
                Pastelería 1000 sabores celebra su 50° aniversario como un referente en la repostería chilena. Descubre nuestras tortas y postres artesanales
              </p>
            </div>
            <div className="col-12 col-md-6">
              <div className="ratio ratio-16x9 rounded shadow-sm bg-light d-flex align-items-center justify-content-center">
                <img src={fotoTienda} alt="Imagen de la tienda" loading="lazy" className="img-fluid rounded" style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'cover'}} />
=======
// src/pages/Home.js
import React, { useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  useEffect(() => { document.title = 'Inicio | Pastelería 1000 Sabores'; }, []);

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
>>>>>>> main
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </header>

    <main className="py-5">
        <Container> 
            <h2 className="mb-4 brand-font text-choco">Productos destacados</h2>
            <Carousel>
                {productosEnGrupos.map((grupo, index) => (
                    <Carousel.Item key={index}>
                        <Row className="g-4 p-5"> 
                            {grupo.map(producto => (
                                <Col md={4} key={producto.codigo}> 
                                    <Card className="h-100 shadow-sm">
                                        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={{height: '200px', objectFit: 'cover'}}/>
                                        <Card.Body>
                                            <Card.Title>{producto.nombre}</Card.Title>
                                            <Card.Text>{producto.descripcion}</Card.Text>
                                            <Button className="btn-choco">Agregar al carrito</Button>
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
  )
};
export default Home;
=======
      </section>
    </>
  );
}
>>>>>>> main
