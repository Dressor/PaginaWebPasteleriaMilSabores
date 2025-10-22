// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-top bg-light-subtle text-muted py-4">
      <div className="container">
        <div className="row g-4 align-items-start">
          {/* Columna 1: marca + tagline */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <h5 className="brand-font text-choco mb-1">Pastelería 1000 Sabores</h5>
            <p className="mb-0">Desde 1975 endulzando Chile con amor y dedicación.</p>
          </div>

          {/* Columna 2: enlaces internos (solo visibles en móvil) */}
          <nav
            className="col-12 d-md-none"
            aria-label="Enlaces del sitio (atajos móviles)"
          >
            <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3 mb-0 small">
              <li>
                <Link className="link-secondary text-decoration-none" to="/">Inicio</Link>
              </li>
              <li>
                <Link className="link-secondary text-decoration-none" to="/productos">Productos</Link>
              </li>
              <li>
                <Link className="link-secondary text-decoration-none" to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link className="link-secondary text-decoration-none" to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link className="link-secondary text-decoration-none" to="/carrito">Carrito</Link>
              </li>
            </ul>
          </nav>

          {/* Columna 3: contacto + redes */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <ul className="list-unstyled mb-2">
              <li className="mb-1">
                <a
                  className="link-secondary text-decoration-none"
                  href="tel:+56987654321"
                  aria-label="Llamar al teléfono"
                >
                  📞 +56 9 8765 4321
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="link-secondary text-decoration-none"
                  href="mailto:contacto@1000sabores.cl"
                  aria-label="Enviar correo electrónico"
                >
                  📧 contacto@1000sabores.cl
                </a>
              </li>
              <li className="mb-0">📍 Av. Principal 1234, Santiago</li>
            </ul>

            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a
                className="text-choco"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a
                className="text-choco"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                className="text-choco"
                href="https://wa.me/56987654321"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp fs-4"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-3" />
        <div className="small text-center">
          © {year} Pastelería 1000 Sabores — Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
