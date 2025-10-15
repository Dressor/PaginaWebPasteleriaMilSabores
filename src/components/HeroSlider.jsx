// src/components/HeroSlider.jsx
import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ✅ Imágenes reales desde tu carpeta
import hero1 from '../assets/img/fotoTienda.png';
import hero2 from '../assets/img/pastelChocolate.png';
import hero3 from '../assets/img/tortaVegana.png';

export default function HeroSlider() {
  const slides = [
    {
      img: hero1,
      title: 'Pastelería 1000 Sabores',
      text: '50 años de sabor artesanal chileno. Calidad, tradición y dulzura en cada porción.',
      btn: { text: 'Explorar productos', to: '/productos' },
    },
    {
      img: hero2,
      title: 'Tortas y postres únicos',
      text: 'Elaborados con ingredientes frescos y un toque casero que nos distingue.',
      btn: { text: 'Haz tu pedido', to: '/productos' },
    },
    {
      img: hero3,
      title: 'Sabores para todos',
      text: 'Incluimos opciones veganas, sin gluten y personalizadas para cada ocasión.',
      btn: { text: 'Conócenos', to: '/propyState' },
    },
  ];

  return (
    <Carousel fade interval={6000}>
      {slides.map((s, i) => (
        <Carousel.Item key={i}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="hero-slide position-relative text-center text-light"
            style={{
              backgroundImage: `url(${s.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '75vh',
            }}
          >
            <div
              className="hero-overlay position-absolute top-0 start-0 w-100 h-100"
              style={{ background: 'rgba(0,0,0,0.55)' }}
            />
            <div className="hero-content position-absolute top-50 start-50 translate-middle px-3">
              <motion.h1
                className="display-5 fw-bold mb-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {s.title}
              </motion.h1>
              <motion.p
                className="lead mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {s.text}
              </motion.p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link to={s.btn.to}>
                  <Button
                    variant="light"
                    className="btn-lg text-choco fw-semibold shadow-sm"
                  >
                    {s.btn.text}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
