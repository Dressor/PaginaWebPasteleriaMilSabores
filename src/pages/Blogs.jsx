// src/pages/Blogs.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import './Home.css';

// Imágenes que YA existen en tu carpeta (según tu screenshot):
import thumb50 from '../assets/img/blog50anios.png';
import thumbTresLeches from '../assets/img/blog-tres-leches.jpeg';

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

      <main className="container py-4">
        <section className="row row-cols-1 row-cols-md-2 g-4">
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
        </section>
      </main>
    </>
  );
}
