// src/pages/Productos.js
/**
 * Página de catálogo de productos.
 * Permite filtrar productos por categoría y buscar por texto.
 * Incluye funcionalidad de agregar al carrito directamente.
 * 
 * @component
 * @returns {JSX.Element} Catálogo de productos con filtros
 */
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import productos from '../data/productos';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import { ProductGridSkeleton } from '../components/ProductCardSkeleton';
import FlyingProductAnimation from '../components/FlyingProductAnimation';
import { useAddToCartAnimation } from '../hooks/useAddToCartAnimation';
import './Home.css';

/**
 * Obtiene todas las categorías únicas de productos.
 * @returns {Array<string>} Array de categorías únicas
 */
function getCategorias() { 
  return [...new Set(productos.map(p => p.categoria))]; 
}

export default function Productos() {
  // Estados para filtros
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart, items } = useCart();
  const { animating, animData, animateAddToCart } = useAddToCartAnimation();

  // Simular carga inicial (en producción sería una llamada a API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 800ms de skeleton
    
    return () => clearTimeout(timer);
  }, []);

  /**
   * Filtra productos según categoría y búsqueda de texto.
   * Usa useMemo para optimizar el rendimiento y evitar recalcular en cada render.
   */
  const listaFiltrada = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter(p => {
      // Filtro por categoría
      const matchCategoria = categoria ? p.categoria === categoria : true;
      // Filtro por búsqueda de texto en nombre o descripción
      const matchTexto = q
        ? (p.nombre?.toLowerCase().includes(q) || p.descripcion?.toLowerCase().includes(q))
        : true;
      return matchCategoria && matchTexto;
    });
  }, [categoria, busqueda]);

  /**
   * Obtiene la cantidad de un producto en el carrito.
   * @param {string} codigo - Código del producto
   * @returns {number} Cantidad en el carrito
   */
  const qtyInCart = (codigo) => items.find(i => i.codigo === codigo)?.qty || 0;

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
            <Form.Select value={categoria} onChange={e => setCategoria(e.target.value)} aria-label="Filtrar por categoría">
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
                aria-label="Buscar por texto"
              />
              <Button variant="outline-secondary" onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda">
                Limpiar
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {loading ? (
          // Mostrar skeleton mientras carga
          <ProductGridSkeleton count={6} />
        ) : listaFiltrada.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No se encontraron productos con los filtros aplicados.
          </div>
        ) : (
          <Row className="g-4">
            {listaFiltrada.map(producto => {
              const current = qtyInCart(producto.codigo);
              const atLimit = Number.isFinite(producto.stock) && current >= producto.stock;
              return (
                <Col xs={12} sm={6} md={4} key={producto.codigo}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={producto.imagen}
                      alt={producto.nombre}
                      loading="lazy"
                      style={{ height: 220, objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="mb-1">{producto.nombre}</Card.Title>
                      <Card.Text className="text-muted mb-2">{producto.categoria}</Card.Text>
                      <Card.Text className="flex-grow-1 text-truncate-3">{producto.descripcion}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <strong className="text-choco">
                          ${producto.precio.toLocaleString('es-CL')}
                        </strong>
                        <div className="d-flex gap-2">
                          <Link to={`/producto/${producto.codigo}`} className="btn btn-outline-choco">Ver</Link>
                          <Button
                            variant="light"
                            onClick={(e) => {
                              animateAddToCart(e, producto.imagen);
                              addToCart(producto, 1);
                            }}
                            disabled={atLimit}
                            aria-disabled={atLimit}
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
        )}
        
        {/* Animación de producto volando al carrito */}
        <FlyingProductAnimation active={animating} data={animData} />
      </Container>
    </>
  );
}
