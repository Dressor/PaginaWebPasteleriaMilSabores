// src/pages/BlogNoticias.jsx
export default function BlogNoticias() {
  return (
    <div className="container py-5">
      <h1 className="brand-font text-choco mb-4 text-center">
        🍰 Noticias de Gastronomía
      </h1>

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
          href="https://elpais.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          🌐 Abrir sitio completo
        </a>
      </div>
    </div>
  );
}
