// src/pages/Productos.js
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productos from '../data/productos';
import './Home.css';

import { Helmet } from 'react-helmet';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';

function getCategorias() {
  return [...new Set(productos.map((p) => p.categoria))];
}

export default function Productos() {
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => { document.title = 'Productos | Pastelería 1000 Sabores'; }, []);

  const listaFiltrada = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const matchCategoria = categoria ? p.categoria === categoria : true;
      const matchTexto = q
        ? (p.nombre?.toLowerCase().includes(q) ||
           p.descripcion?.toLowerCase().includes(q) ||
           p.categoria?.toLowerCase().includes(q))
        : true;
      return matchCategoria && matchTexto;
    });
  }, [categoria, busqueda]);

  return (
    <>
      <Helmet>
        <title>Productos | Pastelería 1000 Sabores</title>
      </Helmet>

      {/* Header / breadcrumb */}
      <header className="bg-rose-subtle border-bottom">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Productos
              </li>
            </ol>
          </nav>
          <h1 className="brand-font text-choco h2 mb-1">Todos los productos</h1>
          <p className="text-muted mb-0">Filtra por categoría o busca por nombre/descripción.</p>
        </div>
      </header>

      {/* Contenido */}
      <main className="py-4">
        <Container>
          {/* Filtros */}
          <Row className="g-3 align-items-end mb-3">
            <Col xs={12} md={4}>
              <Form.Label className="mb-1">Categoría</Form.Label>
              <Form.Select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                aria-label="Filtrar por categoría"
              >
                <option value="">Todas</option>
                {getCategorias().map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={8}>
              <Form.Label className="mb-1">Búsqueda</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Ej: torta chocolate, tres leches..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  aria-label="Buscar producto por texto"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => { setCategoria(''); setBusqueda(''); }}
                >
                  Limpiar
                </Button>
              </InputGroup>
            </Col>
          </Row>

          {/* Listado */}
          {listaFiltrada.length === 0 ? (
            <div className="alert alert-warning">No se encontraron productos.</div>
          ) : (
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {listaFiltrada.map((producto) => (
                <Col key={producto.codigo}>
                  <Card className="h-100 shadow-sm">
                    <Link
                      to={`/producto/${producto.codigo}`}
                      className="ratio ratio-1x1 d-block bg-light d-flex align-items-center justify-content-center"
                    >
                      {producto.imagen ? (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="img-fluid rounded"
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-muted">Sin imagen</span>
                      )}
                    </Link>

                    <Card.Body className="d-flex flex-column">
                      <h5 className="card-title mb-1">{producto.nombre}</h5>
                      <p className="card-text text-muted mb-2">{producto.categoria}</p>
                      <p className="card-text flex-grow-1">
                        {producto.descripcion?.slice(0, 110) || ''}
                        {producto.descripcion && producto.descripcion.length > 110 ? '…' : ''}
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <strong className="text-choco">
                          ${Number(producto.precio).toLocaleString('es-CL')}
                        </strong>
                        <div className="d-flex gap-2">
                          <Link to={`/producto/${producto.codigo}`} className="btn btn-outline-choco">
                            Ver
                          </Link>
                          <button type="button" className="btn btn-light">
                            Agregar
                          </button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </main>
    </>
  );
}
