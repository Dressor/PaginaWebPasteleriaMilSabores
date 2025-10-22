// src/pages/Home.js
/**
 * Página de inicio de la aplicación.
 * Muestra el hero slider, introducción a la pastelería y productos destacados.
 * 
 * @component
 * @returns {JSX.Element} Página de inicio completa
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  // Actualizar el título de la página
  useEffect(() => { 
    document.title = 'Inicio | Pastelería 1000 Sabores'; 
  }, []);

  return (
    <>
      {/* Hero principal con slider de imágenes */}
      <HeroSlider />

      {/* Sección de introducción y valores de la pastelería */}
      <section className="container py-5" aria-labelledby="welcome-heading">
        <header className="mb-4">
          <h1 id="welcome-heading" className="brand-font text-choco mb-2">
            Bienvenido a Pastelería 1000 Sabores
          </h1>
          <p className="lead mb-0">
            Somos una pastelería artesanal con más de 50 años de tradición. Elaboramos tortas,
            postres y productos personalizados con ingredientes seleccionados y el cariño de siempre.
          </p>
        </header>

        <div className="row g-4 mt-1">
          <div className="col-12 col-md-4">
            <article className="card h-100 text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">🎂 Tradición y sabor</h5>
                <p className="mb-0">Recetas familiares que han pasado de generación en generación.</p>
              </div>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="card h-100 text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">🧁 Productos personalizados</h5>
                <p className="mb-0">Creamos tortas y postres a medida para cada ocasión especial.</p>
              </div>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="card h-100 text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">☕ Atención cálida</h5>
                <p className="mb-0">Visítanos y vive la experiencia de la repostería tradicional chilena.</p>
              </div>
            </article>
          </div>
        </div>

        {/* CTA al catálogo */}
        <div className="d-flex justify-content-center mt-4">
          <Link to="/productos" className="btn btn-choco">
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {/* Productos destacados (tu componente) */}
      <FeaturedProducts />
    </>
  );
}
