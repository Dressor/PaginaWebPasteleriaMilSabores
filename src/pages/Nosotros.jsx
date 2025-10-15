// src/pages/Nosotros.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Accordion, Badge } from 'react-bootstrap';
import './Home.css';

import fotoEquipo from '../assets/img/nosotros.jpg';
import logo from '../assets/img/logo.png';

export default function Nosotros() {
  return (
    <>
      <Helmet>
        <title>Nosotros | Pastelería 1000 Sabores</title>
        <meta
          name="description"
          content="Conoce la historia, misión, valores y equipo de Pastelería 1000 Sabores: 50 años de repostería artesanal en Chile."
        />
      </Helmet>

      {/* HEADER con el mismo estilo que Productos/Blogs */}
      <header className="section-header rounded-3 shadow-sm my-3">
        <div className="container py-4">
          <div className="d-flex align-items-center gap-3">
            <img
              src={logo}
              alt="Logo Pastelería 1000 Sabores"
              width={56}
              height={56}
              className="d-none d-sm-block"
              style={{ objectFit: 'cover' }}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div>
              <h1 className="brand-font text-choco mb-1">Nuestra historia</h1>
              <p className="text-muted mb-0">
                50 años endulzando Chile con calidad, tradición e innovación.
              </p>
              <div className="mt-2 d-flex gap-2 flex-wrap">
                <Badge bg="" className="badge-soft">Artesanal</Badge>
                <Badge bg="" className="badge-soft">Recetas familiares</Badge>
                <Badge bg="" className="badge-soft">Ingredientes frescos</Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="row g-4">
          {/* Columna principal */}
          <div className="col-12 col-lg-8">
            {/* Valores */}
            <section className="mb-4">
              <h2 className="h4 text-choco mb-3">Nuestros valores</h2>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="value-card h-100 p-3 rounded-3 border">
                    <div className="fs-4 mb-2">🎂</div>
                    <h3 className="h6 mb-1">Calidad artesanal</h3>
                    <p className="text-muted small mb-0">Ingredientes frescos, recetas probadas y detalle en cada capa.</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="value-card h-100 p-3 rounded-3 border">
                    <div className="fs-4 mb-2">✨</div>
                    <h3 className="h6 mb-1">Innovación</h3>
                    <p className="text-muted small mb-0">Sabores modernos y opciones para todos: veganas y sin gluten.</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="value-card h-100 p-3 rounded-3 border">
                    <div className="fs-4 mb-2">🍬</div>
                    <h3 className="h6 mb-1">Cercanía</h3>
                    <p className="text-muted small mb-0">Atención dedicada y experiencias que se recuerdan.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Misión / Visión (cards que respetan el tema) */}
            <section className="mb-4">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h2 className="h5 text-choco">Misión</h2>
                      <p className="mb-0">
                        Ofrecer una experiencia dulce y memorable con tortas y repostería de alta calidad para
                        todas las ocasiones, celebrando nuestras raíces e impulsando la creatividad.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h2 className="h5 text-choco">Visión</h2>
                      <p className="mb-0">
                        Ser la tienda online líder de repostería en Chile, reconocida por innovación, calidad e
                        impacto positivo en la comunidad y nuevos talentos gastronómicos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hitos */}
            <section className="mb-4">
              <h2 className="h4 text-choco">Hitos</h2>
              <ol className="timeline">
                <li>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="fw-semibold">1975</div>
                    <p className="text-muted small mb-0">Fundación de la pastelería.</p>
                  </div>
                </li>
                <li>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="fw-semibold">1995</div>
                    <p className="text-muted small mb-0">Récord Guinness: colaboración en la torta más grande del mundo.</p>
                  </div>
                </li>
                <li>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="fw-semibold">2025</div>
                    <p className="text-muted small mb-0">Renovación del sistema de ventas online.</p>
                  </div>
                </li>
              </ol>
            </section>

            {/* Equipo */}
            <section className="mb-2">
              <h2 className="h4 text-choco">Equipo</h2>
              <p className="mb-2">
                Proyecto desarrollado por estudiantes de Ingeniería en Informática — Duoc UC, Sede San Joaquín (DSY1104).
              </p>
              <ul className="mb-0">
                <li>Sergio Araya</li>
                <li>Francisca Villar</li>
                <li>Diego Azcarategui</li>
                <li><em>Profesor:</em> Daniel Riquelme Rigott</li>
              </ul>
            </section>

            {/* FAQ opcional */}
            <section className="mt-3">
              <h2 className="h5 text-choco">Preguntas frecuentes</h2>
              <Accordion className="mt-2">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>¿Hacen tortas personalizadas?</Accordion.Header>
                  <Accordion.Body className="text-muted">
                    Sí. Coordina sabores y decoración desde el catálogo; te guiaremos en todo el proceso.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>¿Tienen opciones veganas o sin gluten?</Accordion.Header>
                  <Accordion.Body className="text-muted">
                    Contamos con alternativas veganas y sin gluten, identificadas en el catálogo.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </section>
          </div>

          {/* Lateral */}
          <div className="col-12 col-lg-4">
            <div className="ratio ratio-4x3 rounded shadow-sm bg-light overflow-hidden">
              <img
                src={fotoEquipo}
                alt="Foto histórica de Pastelería 1000 Sabores"
                className="w-100 h-100"
                style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="card mt-3 shadow-sm">
              <div className="card-body">
                <h3 className="h6 text-choco mb-2">¿Dónde estamos?</h3>
                <p className="text-muted mb-2">
                  Santiago, Chile. Atención de lunes a sábado.
                </p>
                <a
                  className="btn btn-outline-choco btn-sm"
                  href="https://www.google.com/maps/search/?api=1&query=Pasteler%C3%ADa+1000+Sabores+Santiago+Chile"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
