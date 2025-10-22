// src/components/FlyingProductAnimation.jsx
/**
 * Componente de animación para productos que "vuelan" al carrito.
 * Se activa al agregar productos y muestra una miniatura volando.
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.active - Si la animación está activa
 * @param {Object} props.data - Datos de posición e imagen
 * @returns {JSX.Element|null}
 */
import React from 'react';
import './FlyingProductAnimation.css';

export default function FlyingProductAnimation({ active, data }) {
  if (!active) return null;

  return (
    <div
      className="flying-product"
      style={{
        left: data.x,
        top: data.y,
      }}
    >
      <img src={data.img} alt="Producto agregado" />
    </div>
  );
}
