<<<<<<< HEAD
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Home.css'; 
import productos from '../data/productos';
import 'bootstrap/dist/css/bootstrap.min.css';

function Producto() {
  const { code } = useParams();
  const producto = productos.find(p => p.codigo === code);

  if (!producto) {
    return (
      <main className="container py-4">
        <div className="alert alert-warning">
          Producto no encontrado. <Link to="/producto" className="alert-link">Volver al listado</Link>.
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="bg-rose-subtle border-bottom">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
              <li className="breadcrumb-item"><Link to="/producto">Productos</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
            </ol>
          </nav>
          <h1 className="brand-font text-choco">{producto.nombre}</h1>
        </div>
      </header>

      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="ratio ratio-4x3 bg-light rounded shadow-sm d-flex align-items-center justify-content-center">
              {producto.imagen ? (
                <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'cover'}} />
              ) : (
                <span className="text-muted">Sin imagen</span>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h2>{producto.nombre}</h2>
            <p className="text-muted">{producto.categoria}</p>
            <p>{producto.descripcion}</p>
            <p><strong>Stock:</strong> {producto.stock} unidades</p>
            <div className="d-flex align-items-center gap-3">
              <strong className="fs-4">${producto.precio.toLocaleString('es-CL')}</strong>
              <button className="btn btn-rose">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Producto;
=======
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Carousel, Form, InputGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import productos from '../data/productos';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import './Home.css';

function getCategorias() { return [...new Set(productos.map(p => p.categoria))]; }
function chunk(array, size) { const out = []; for (let i=0;i<array.length;i+=size) out.push(array.slice(i,i+size)); return out; }

export default function Productos() {
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const { addToCart, items } = useCart();

  const listaFiltrada = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter(p => {
      const matchCategoria = categoria ? p.categoria === categoria : true;
      const matchTexto = q ? (
        p.nombre?.toLowerCase().includes(q) ||
        p.descripcion?.toLowerCase().includes(q) ||
        p.categoria?.toLowerCase().includes(q)
      ) : true;
      return matchCategoria && matchTexto;
    });
  }, [categoria, busqueda]);

  const grupos = useMemo(() => chunk(listaFiltrada, 6), [listaFiltrada]);
  const qtyInCart = (codigo) => items.find(i => i.codigo === codigo)?.qty || 0;

  return (
    <>
      <Helmet>
        <title>Catálogo | Pastelería 1000 Sabores</title>
      </Helmet>

      <SectionHeader
        title="Nuestros productos"
        subtitle="Tortas, postres y repostería artesanal hechos con amor."
      />

      <Container className="py-4">
        <Row className="g-3 align-items-end mb-4">
          <Col md={4}>
            <Form.Label className="mb-1">Categoría</Form.Label>
            <Form.Select value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value="">Todas</option>
              {getCategorias().map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </Form.Select>
          </Col>
          <Col md={8}>
            <Form.Label className="mb-1">Búsqueda</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Busca por nombre o descripción…"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setBusqueda('')}>Limpiar</Button>
            </InputGroup>
          </Col>
        </Row>

        {listaFiltrada.length === 0 ? (
          <p className="text-muted">No se encontraron productos con los filtros aplicados.</p>
        ) : (
          <Carousel>
            {grupos.map((grupo, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4 p-3 p-md-4">
                  {grupo.map(producto => {
                    const current = qtyInCart(producto.codigo);
                    const atLimit = Number.isFinite(producto.stock) && current >= producto.stock;
                    return (
                      <Col md={4} key={producto.codigo}>
                        <Card className="h-100 shadow-sm">
                          <Card.Img variant="top" src={producto.imagen} alt={producto.nombre}
                            style={{ height: 220, objectFit: 'cover' }} />
                          <Card.Body className="d-flex flex-column">
                            <Card.Title>{producto.nombre}</Card.Title>
                            <Card.Text className="text-muted mb-2">{producto.categoria}</Card.Text>
                            <Card.Text className="flex-grow-1">
                              {producto.descripcion?.slice(0, 110) || ''}{producto.descripcion?.length > 110 ? '…' : ''}
                            </Card.Text>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <strong className="text-choco">
                                ${producto.precio.toLocaleString('es-CL')}
                              </strong>
                              <div className="d-flex gap-2">
                                <Link to={`/producto/${producto.codigo}`} className="btn btn-outline-choco">Ver</Link>
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  onClick={() => addToCart(producto, 1)}
                                  disabled={atLimit}
                                >
                                  {atLimit ? 'Sin stock' : 'Agregar'}
                                </button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </>
  );
}
>>>>>>> main
