// src/components/FeaturedProducts.jsx
import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import productos from '../data/productos';
import { useCart } from '../context/CartContext';

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
  return out;
}

export default function FeaturedProducts() {
  const { addToCart, fmtCLP } = useCart();
  const destacados = productos.slice(0, 6); // top 6
  const carouselId = useId().replace(/:/g, ''); // id único y válido
  const slides = chunk(destacados, 3); // 3 por slide (desktop)

  return (
    <section className="container py-5">
      <h2 className="brand-font text-choco mb-4 text-center">Productos destacados</h2>

      <div
        id={`carouselDestacados-${carouselId}`}
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
        aria-label="Carrusel de productos destacados"
      >
        {/* Indicadores (puntitos) */}
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target={`#carouselDestacados-${carouselId}`}
              data-bs-slide-to={idx}
              className={idx === 0 ? 'active' : ''}
              aria-current={idx === 0 ? 'true' : undefined}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {slides.map((grupo, slideIndex) => (
            <div
              key={slideIndex}
              className={`carousel-item${slideIndex === 0 ? ' active' : ''}`}
            >
              <div className="row g-4 justify-content-center px-2">
                {grupo.map((prod) => (
                  <div
                    key={prod.codigo}
                    className="col-12 col-sm-6 col-lg-4"
                  >
                    <div className="card h-100 shadow-sm">
                      <div className="ratio ratio-1x1 bg-light">
                        <img
                          src={prod.imagen}
                          alt={prod.nombre}
                          className="img-fluid rounded-top"
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title mb-1">{prod.nombre}</h5>
                        <p className="text-muted small mb-2">{prod.categoria}</p>
                        <p className="card-text flex-grow-1">
                          {(prod.descripcion || '').slice(0, 110)}
                          {(prod.descripcion || '').length > 110 ? '…' : ''}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <strong className="text-choco">{fmtCLP(prod.precio)}</strong>
                          <div className="d-flex gap-2">
                            <Link to={`/producto/${prod.codigo}`} className="btn btn-outline-choco">
                              Ver
                            </Link>
                            <button
                              type="button"
                              className="btn btn-light"
                              onClick={() => addToCart(prod, 1)}
                            >
                              Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carouselDestacados-${carouselId}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carouselDestacados-${carouselId}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}
