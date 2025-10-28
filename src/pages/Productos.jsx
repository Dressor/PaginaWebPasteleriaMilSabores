import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import productos from '../data/productos';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import './Home.css';

// Extrae categorías únicas desde el listado de productos.
// Mantener la función fuera del componente evita recalcularla innecesariamente.
function getCategorias() { return [...new Set(productos.map(p => p.categoria))]; }

export default function Productos() {
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [searchParams] = useSearchParams();

  // Si llegamos a esta página con ?q=term desde el header, inicializamos
  // el estado de búsqueda con ese valor para que la lista se filtre.
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q && q !== busqueda) setBusqueda(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
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

  const navigate = useNavigate();
  // `selected` mantiene qué tarjeta está resaltada; útil para accesibilidad y UX.
  // Se inicializa con el primer producto visible para dar foco visual.
  const [selected, setSelected] = useState(null);

  React.useEffect(() => {
    if (listaFiltrada && listaFiltrada.length) {
      setSelected(listaFiltrada[0].codigo);
    } else {
      setSelected(null);
    }
  }, [listaFiltrada]);

  // Maneja clicks sobre la tarjeta: navegamos al detalle salvo que el click
  // ocurra sobre un control interno (botón o enlace), en cuyo caso dejamos
  // que el propio control maneje el evento.
  const onCardClick = (e, producto) => {
    const tag = e.target && (e.target.tagName || '').toLowerCase();
    if (tag === 'button' || tag === 'a' || e.target.closest && e.target.closest('button, a')) return;
    navigate(`/producto/${producto.codigo}`);
  };

  return (
    <>
      <Helmet><title>Productos | Pastelería 1000 Sabores</title></Helmet>

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
          {listaFiltrada.map((producto, idx) => {
            const current = qtyInCart(producto.codigo);
            const atLimit = Number.isFinite(producto.stock) && current >= producto.stock;
            return (
              <Col md={4} key={producto.codigo}>
                <Card
                  className={`h-100 product-card ${selected === producto.codigo ? 'highlight' : ''}`}
                  onClick={(e) => onCardClick(e, producto)}
                  onMouseEnter={() => setSelected(producto.codigo)}
                >
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
                        <Link to={`/producto/${producto.codigo}`} className="btn btn-outline-choco" onClick={(e) => e.stopPropagation()}>Ver</Link>
                        <Button
                          variant="light"
                          onClick={(e) => { e.stopPropagation(); addToCart(producto, 1); }}
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
