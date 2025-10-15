// src/pages/BlogTresLeches.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import imgDestacada from '../assets/img/blog-tres-leches.jpeg';

export default function BlogTresLeches() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Tres leches clásica",
    "author": { "@type": "Organization", "name": "Pastelería 1000 Sabores" },
    "datePublished": "2025-08-30",
    "image": "https://tusitio.cl/img/blog-tres-leches.jpg"
  };

  return (
    <>
      <Helmet>
        <title>Tres leches clásica | Pastelería 1000 Sabores</title>
        <meta
          name="description"
          content="Receta clásica de torta tres leches: pasos, tips y tiempos para un resultado perfecto y jugoso."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Tres leches clásica" />
        <meta property="og:description" content="Receta clásica de torta tres leches: pasos, tips y tiempos para un resultado perfecto." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {/* relación con el artículo previo */}
        <link rel="prev" href="/blog/50-anios" />
      </Helmet>

      <main className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="miga de pan">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link className="text-decoration-none" to="/">Inicio</Link></li>
            <li className="breadcrumb-item"><Link className="text-decoration-none" to="/blogs">Blogs</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Tres leches clásica</li>
          </ol>
        </nav>

        <article className="mx-auto" style={{ maxWidth: 900 }}>
          <img
            src={imgDestacada}
            alt="Porción de torta tres leches con crema por encima"
            className="img-fluid rounded shadow-sm mb-3"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x675?text=Imagen+no+disponible'; }}
          />

          <header className="mb-2">
            <h1 className="brand-font text-choco h2 mb-1">Receta: tres leches clásica</h1>
            <p className="text-muted mb-0">Una guía paso a paso para lograr una esponja aireada y un equilibrio perfecto de leches.</p>
          </header>

          <p>Para la base, bate yemas y azúcar hasta blanquear; incorpora harina cernida en movimientos envolventes y, por último, claras a punto nieve. Hornea a 180&nbsp;°C hasta que esté dorado y el palillo salga seco.</p>
          <p>Mezcla las tres leches y, con el bizcocho aún tibio, pínchalo y báñalo lentamente para que absorba de forma uniforme. Cubre con crema batida suave.</p>
          <p><strong>Consejo:</strong> refrigera al menos 6&nbsp;horas antes de servir para un resultado más jugoso.</p>

          {/* Navegación entre artículos */}
          <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
            <nav aria-label="Artículos relacionados" className="me-auto">
              <Link className="btn btn-outline-secondary" to="/blog/50-anios" rel="prev">
                ← Anterior: 50 años de dulzura
              </Link>
            </nav>
            <Link className="btn btn-outline-choco" to="/blogs" aria-label="Volver a Blogs">
              Volver a Blogs
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
