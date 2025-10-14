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
              </div>
            </div>
          </div>
        </div>
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