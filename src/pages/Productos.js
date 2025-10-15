<<<<<<< HEAD
import React, { useState } from 'react';
import productos from '../data/productos';
import './Home.css'; 

function getCategorias() {

  return [...new Set(productos.map(p => p.categoria))];
}

function Productos() {
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

 
  const listaFiltrada = productos.filter(p => {
    const matchCategoria = categoria ? p.categoria === categoria : true;
    const matchBusqueda = busqueda ? p.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true;
    return matchCategoria && matchBusqueda;
  });

  return (
    <>
      <header className="bg-rose-subtle border-bottom">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Inicio</a></li>
              <li className="breadcrumb-item active" aria-current="page">Productos</li>
            </ol>
          </nav>
          <h1 className="brand-font text-choco">Todos los productos</h1>
          <p className="text-muted">Filtra por categoría o busca por nombre.</p>
        </div>
      </header>

      <main className="container py-4">
        <div className="row g-3 align-items-end mb-3">
          <div className="col-12 col-md-4">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {getCategorias().map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Buscar</label>
            <input
              type="search"
              className="form-control"
              placeholder="Ej: torta chocolate"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-grid d-md-flex gap-2">
            <button
              className="btn btn-outline-choco mt-3 mt-md-0"
              onClick={() => { setCategoria(''); setBusqueda(''); }}
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {listaFiltrada.length === 0 && (
            <div className="col">
              <div className="alert alert-warning">No se encontraron productos.</div>
            </div>
          )}
          {listaFiltrada.map(producto => (
            <div className="col" key={producto.codigo}>
              <div className="card h-100 shadow-sm">
                <a
                  className="ratio ratio-1x1 d-block bg-light d-flex align-items-center justify-content-center"
                  href={`/producto/${producto.codigo}`}
                >
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="img-fluid rounded"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-muted">Sin imagen</span>
                  )}
                </a>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text flex-grow-1">
                    <small className="text-muted">{producto.categoria}</small>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>${producto.precio.toLocaleString('es-CL')}</strong>
                    <div className="btn-group">
                      <a href={`/producto/${producto.codigo}`} className="btn btn-outline-choco">Ver</a>
                        <button type="button" class="btn btn-light">Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Productos;
=======
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import productos from '../data/productos';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import './Home.css';

function getCategorias() { return [...new Set(productos.map(p => p.categoria))]; }

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
        p.descripcion?.toLowerCase().includes(q)
      ) : true;
      return matchCategoria && matchTexto;
    });
  }, [categoria, busqueda]);

  const qtyInCart = (codigo) => items.find(i => i.codigo === codigo)?.qty || 0;

  return (
    <>
      <Helmet>
        <title>Productos | Pastelería 1000 Sabores</title>
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
                placeholder="Busca por nombre o descripción..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setBusqueda('')}>Limpiar</Button>
            </InputGroup>
          </Col>
        </Row>

        <Row className="g-4">
          {listaFiltrada.map(producto => {
            const current = qtyInCart(producto.codigo);
            const atLimit = Number.isFinite(producto.stock) && current >= producto.stock;
            return (
              <Col md={4} key={producto.codigo}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text className="text-muted">{producto.categoria}</Card.Text>
                    <Card.Text className="flex-grow-1">{producto.descripcion}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <strong className="text-choco">
                        ${producto.precio.toLocaleString('es-CL')}
                      </strong>
                      <div className="d-flex gap-2">
                        <Link to={`/producto/${producto.codigo}`} className="btn btn-outline-choco">Ver</Link>
                        <Button
                          variant="light"
                          onClick={() => addToCart(producto, 1)}
                          disabled={atLimit}
                        >
                          {atLimit ? 'Sin stock' : 'Agregar'}
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
>>>>>>> main
