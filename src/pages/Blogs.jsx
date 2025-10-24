// src/pages/Blogs.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import './Home.css';

// Imágenes existentes:
import thumb50 from '../assets/img/blog50anios.png';
import thumbTresLeches from '../assets/img/blog-tres-leches.jpeg';
import thumbNoticias from '../assets/img/NoticiasGastronomia.png'; // ← imagen de la noticia

export default function Blogs() {
  return (
    <>
      <Helmet>
        <title>Blogs | Pastelería 1000 Sabores</title>
        <meta
          name="description"
          content="Noticias, historias y recetas de la Pastelería 1000 Sabores. Descubre tendencias dulces, tips y clásicos."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blogs | Pastelería 1000 Sabores" />
        <meta property="og:description" content="Noticias, historias y recetas de la casa." />
      </Helmet>

      <SectionHeader
        title="Noticias & Datos Dulces"
        subtitle="Historias, recetas y comunidad."
      />

      {/* 🧁 GRID DE BLOGS */}
      <main className="container py-4">
        <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* Post 1 */}
          <article className="col">
            <div className="card h-100 position-relative">
              <Link to="/blog/50-anios" aria-label="Ir al artículo 50 años de dulzura">
                <img
                  className="card-img-top"
                  src={thumb50}
                  alt="Pastel con vela dorada: 50 años de dulzura"
                  style={{ objectFit: 'cover', height: 220 }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h2 className="h5 card-title mb-1">50 años de dulzura</h2>
                <p className="card-text">Cómo evolucionó la pastelería desde 1975 hasta hoy.</p>
                <Link to="/blog/50-anios" className="stretched-link" aria-label="Leer más: 50 años de dulzura" />
                <Link className="mt-auto btn btn-outline-choco" to="/blog/50-anios">Leer más</Link>
              </div>
            </div>
          </article>

          {/* Post 2 */}
          <article className="col">
            <div className="card h-100 position-relative">
              <Link to="/blog/tres-leches" aria-label="Ir al artículo Receta: tres leches clásica">
                <img
                  className="card-img-top"
                  src={thumbTresLeches}
                  alt="Torta tres leches con crema: receta clásica"
                  style={{ objectFit: 'cover', height: 220 }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h2 className="h5 card-title mb-1">Receta: tres leches clásica</h2>
                <p className="card-text">Tips para lograr el equilibrio perfecto entre esponja y crema.</p>
                <Link to="/blog/tres-leches" className="stretched-link" aria-label="Leer más: tres leches clásica" />
                <Link className="mt-auto btn btn-outline-choco" to="/blog/tres-leches">Leer más</Link>
              </div>
            </div>
          </article>

          {/* Post 3 */}
          <article className="col">
            <div className="card h-100 position-relative">
              <img
                className="card-img-top"
                src={thumbNoticias}
                alt="Noticias de gastronomía"
                style={{ objectFit: 'cover', height: 220 }}
              />
              <div className="card-body d-flex flex-column">
                <h2 className="h5 card-title mb-1">Noticias de Gastronomía</h2>
                <p className="card-text">
                  Lo último en tendencias culinarias, chefs y cultura gastronómica.
                </p>
                <a
                  className="mt-auto btn btn-outline-choco"
                  href="#noticias-gastronomia"
                >
                  Ver noticias
                </a>
              </div>
            </div>
          </article>
        </section>

        {/* 🔽 SECCIÓN DE NOTICIAS INTEGRADA */}
        <hr className="my-5" />
        <section id="noticias-gastronomia" className="mt-5">
          <h2 className="brand-font text-choco mb-4 text-center">
            🍰 Noticias de Gastronomía
          </h2>

          <p className="lead text-center mb-4">
            Explora las últimas tendencias, recetas e historias del mundo culinario y pastelero.
          </p>

          {/* Contenedor responsivo */}
          <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden">
            <iframe
              src="https://elpais.com/noticias/gastronomia/"
              title="El País - Noticias de Gastronomía"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>

          <p className="text-muted mt-3 text-center">
            Si no ves el contenido, el sitio puede no permitir ser embebido por políticas de seguridad.
          </p>

          <div className="text-center mt-4">
            <a
              className="btn btn-choco px-4 py-2"
              href="https://elpais.com/noticias/gastronomia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              🌐 Abrir sitio completo
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
