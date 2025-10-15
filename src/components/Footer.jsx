// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-top bg-light-subtle text-center text-muted py-4">
      <div className="container">
        <div className="row justify-content-center mb-3">
          <div className="col-md-4">
            <h5 className="brand-font text-choco">Pastelería 1000 Sabores</h5>
            <p>Desde 1975 endulzando Chile con amor y dedicación.</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-2">Contacto</h6>
            <p className="mb-1">📞 +56 9 8765 4321</p>
            <p className="mb-1">📧 contacto@1000sabores.cl</p>
            <p className="mb-0">📍 Av. Principal 1234, Santiago, Chile</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-2">Síguenos</h6>
            <a href="https://instagram.com" className="text-choco me-3"><i className="bi bi-instagram fs-4"></i></a>
            <a href="https://facebook.com" className="text-choco me-3"><i className="bi bi-facebook fs-4"></i></a>
            <a href="https://wa.me/56987654321" className="text-choco"><i className="bi bi-whatsapp fs-4"></i></a>
          </div>
        </div>
        <small>© {new Date().getFullYear()} Pastelería 1000 Sabores. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}
