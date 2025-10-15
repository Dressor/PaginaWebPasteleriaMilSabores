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
