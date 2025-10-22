// src/components/ProductCardSkeleton.jsx
/**
 * Componente Skeleton Loader para tarjetas de productos.
 * Muestra un placeholder animado mientras cargan los productos reales.
 * Mejora la percepción de velocidad de carga.
 * 
 * @component
 * @returns {JSX.Element} Skeleton de tarjeta de producto
 */
import React from 'react';
import './ProductCardSkeleton.css';

export default function ProductCardSkeleton() {
  return (
    <div className="card h-100 skeleton-card" aria-busy="true" aria-label="Cargando producto...">
      <div className="skeleton skeleton-image ratio ratio-4x3"></div>
      <div className="card-body">
        <div className="skeleton skeleton-title mb-2"></div>
        <div className="skeleton skeleton-text mb-2" style={{ width: '60%' }}></div>
        <div className="skeleton skeleton-text mb-3" style={{ width: '40%' }}></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
}

/**
 * Grid de múltiples skeletons para lista de productos
 * 
 * @param {Object} props
 * @param {number} props.count - Número de skeletons a mostrar
 * @returns {JSX.Element}
 */
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="row g-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col-12 col-sm-6 col-md-4">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
