// src/pages/Blog50Anios.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import imgDestacada from '../assets/img/blog50anios.png';

export default function Blog50Anios() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "50 años de dulzura",
    "author": { "@type": "Organization", "name": "Pastelería 1000 Sabores" },
    "datePublished": "2025-08-28",
    "image": "https://tusitio.cl/img/blog50anios.jpg"
  };

  return (
    <>
      <Helmet>
        <title>50 años de dulzura | Pastelería 1000 Sabores</title>
        <meta
          name="description"
          content="Nuestra historia de dulzura desde 1975: hitos, comunidad y tradición pastelera que sigue creciendo."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="50 años de dulzura" />
        <meta property="og:description" content="Nuestra historia de dulzura desde 1975: hitos, comunidad y tradición pastelera." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {/* relación con el siguiente artículo */}
        <link rel="next" href="/blog/tres-leches" />
      </Helmet>

      <main className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="miga de pan">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link className="text-decoration-none" to="/">Inicio</Link></li>
            <li className="breadcrumb-item"><Link className="text-decoration-none" to="/blogs">Blogs</Link></li>
            <li className="breadcrumb-item active" aria-current="page">50 años de dulzura</li>
          </ol>
        </nav>

        <article className="mx-auto" style={{ maxWidth: 900 }}>
          <img
            src={imgDestacada}
            alt="Collage de hitos de la pastelería 1000 Sabores"
            className="img-fluid rounded shadow-sm mb-3"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x675?text=Imagen+no+disponible'; }}
          />

          <header className="mb-2">
            <h1 className="brand-font text-choco h2 mb-1">50 años de dulzura</h1>
            <p className="text-muted mb-0">Desde 1975 celebrando hitos, comunidad y tradición pastelera.</p>
          </header>

          <p>Desde 1975, nuestra pastelería ha marcado hitos, incluyendo la colaboración en la torta más grande del mundo (1995). Hoy seguimos innovando online.</p>
          <p>Explora cómo combinamos tradición, calidad y comunidad para crear experiencias memorables.</p>

          {/* Navegación entre artículos */}
          <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
            <Link className="btn btn-outline-secondary" to="/blog/tres-leches" rel="next">
              Siguiente: Tres leches clásica →
            </Link>
            <div className="ms-auto">
              <Link className="btn btn-outline-choco" to="/blogs" aria-label="Volver a Blogs">Volver a Blogs</Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
