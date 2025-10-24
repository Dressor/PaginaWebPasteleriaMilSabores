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
            <p><strong>Para el relleno:</strong></p>
            <p>- 1 tarro de leche condensada</p>
            <p>- 1 tarro de leche evaporada </p>
            <p>- 1 1/4 taza de crema </p>
            <p>- 1 cucharadita de Esencia de Vainilla </p>

            <p><strong>Para el merengue:</strong></p>
            <p>- 4 claras de huevo</p>
            <p>- 1 taza de azúcara </p>

            <p><strong>PREPARACIÓN: </strong></p>
            <p> 1.- Preparar el Bizcocho: calentar el horno a 180ºC. Enmantequillar un molde de torta de 25 cms de diámetro. Cernir la harina y los Polvos de Hornear Gourmet, reservar. Batir la mantequilla con el azúcar hasta que la mezcla esté bien cremosa. Agregar los huevos y la Esencia de Vainilla Gourmet y batir bien para integrar. Agregar la harina cernida de a dos cucharadas a la vez, mezclando bien después de cada adición. Poner la mezcla en el molde y hornear por 45 minutos.</p>
            <p> 2.- Preparar el relleno: poner todos los ingredientes en una olla. Cocinar a fuego medio, revolviendo constantemente hasta que la mezcla espese. Tiene que quedar como un manjar blanco. Juntar los ingredientes del remojo en un recipiente y revolver hasta incorporar bien. Cortar la torta en dos o tres capas. Poner la primera capa en un plato (donde se va a servir la torta)  y remojar de a cucharaditas sobre el queque con 1/3 de la mezcla de remojo. Poner la mitad de relleno, luego otra capa de queque. Remojar esta capa y luego poner el resto del relleno. Terminar con la última capa de queque y remojar. Ideal es tener la torta lista hasta este punto un día antes, reservada en el refrigerador. </p>
            <p> 3.- Preparar el merengue: poner la claras y el azúcar en un bol y llevar a baño maría (sin que el bol esté en contacto con el agua) hasta que el azúcar se haya disuelto completamente. Sacar el bol de baño maría. Batir las claras hasta que el merengue esté duro y brillante (10 minutos aprox.). Una vez que el merengue esté frío, cubrir la torta con este merengue y servir.</p>
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
