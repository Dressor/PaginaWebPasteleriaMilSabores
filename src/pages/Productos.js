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
