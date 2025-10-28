// src/pages/Blogs.jsx
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import './Home.css';

// Imágenes existentes:
import thumb50 from '../assets/img/blog50anios.png';
import thumbTresLeches from '../assets/img/blog-tres-leches.jpeg';
import thumbNoticias from '../assets/img/NoticiasGastronomia.png'; // ← imagen de la noticia

export default function Blogs() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  // Lista de posts como datos para poder filtrarlos por búsqueda
  const posts = [
    {
      slug: '50-anios',
      title: '50 años de dulzura',
      desc: 'Cómo evolucionó la pastelería desde 1975 hasta hoy.',
      thumb: thumb50,
      to: '/blog/50-anios'
    },
    {
      slug: 'tres-leches',
      title: 'Receta: tres leches clásica',
      desc: 'Tips para lograr el equilibrio perfecto entre esponja y crema.',
      thumb: thumbTresLeches,
      to: '/blog/tres-leches'
    },
    {
      slug: 'noticias-gastronomia',
      title: 'Noticias de Gastronomía',
      desc: 'Lo último en tendencias culinarias, chefs y cultura gastronómica.',
      thumb: thumbNoticias,
      to: '#noticias-gastronomia'
    }
  ];

  const filtered = useMemo(() => {
    if (!q) return posts;
    return posts.filter(p => (
      p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.slug.includes(q)
    ));
  }, [q]);
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
              {filtered.map((post) => (
                <article className="col" key={post.slug}>
                  <div className="card h-100 position-relative product-card">
                {post.to.startsWith('#') ? (
                  <img
                    className="card-img-top"
                    src={post.thumb}
                    alt={post.title}
                    style={{ objectFit: 'cover', height: 220 }}
                  />
                ) : (
                  <Link to={post.to} aria-label={`Ir al artículo ${post.title}`}>
                    <img
                      className="card-img-top"
                      src={post.thumb}
                      alt={post.title}
                      style={{ objectFit: 'cover', height: 220 }}
                    />
                  </Link>
                )}
                <div className="card-body d-flex flex-column">
                  <h2 className="h5 card-title mb-1">{post.title}</h2>
                  <p className="card-text">{post.desc}</p>
                  {post.to.startsWith('#') ? (
                    <a className="mt-auto btn btn-outline-choco" href={post.to}>Ver noticias</a>
                  ) : (
                    <>
                      <Link to={post.to} className="stretched-link" aria-label={`Leer más: ${post.title}`} />
                      <Link className="mt-auto btn btn-outline-choco" to={post.to}>Leer más</Link>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
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
