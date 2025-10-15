// src/pages/Home.js
import React, { useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  useEffect(() => { document.title = 'Inicio | Pastelería 1000 Sabores'; }, []);

  return (
    <>
      <HeroSlider />
      <section className="container py-5">
        <h1 className="brand-font text-choco mb-3">Bienvenido a Pastelería 1000 Sabores</h1>
        <p className="lead">
          Somos una pastelería artesanal con más de 50 años de tradición. Elaboramos tortas,
          postres y productos personalizados con ingredientes seleccionados y el cariño de siempre.
        </p>

        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">🎂 Tradición y sabor</h5>
                <p>Recetas familiares que han pasado de generación en generación.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">🧁 Productos personalizados</h5>
                <p>Creamos tortas y postres a medida para cada ocasión especial.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-2">☕ Atención cálida</h5>
                <p>Visítanos y vive la experiencia de la repostería tradicional chilena.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
