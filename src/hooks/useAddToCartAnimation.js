// src/hooks/useAddToCartAnimation.js
/**
 * Hook personalizado para animar productos agregados al carrito.
 * Crea un efecto visual del producto "volando" hacia el ícono del carrito.
 * 
 * @returns {Object} Funciones para animar y elemento de animación
 */
import { useState, useCallback } from 'react';

export function useAddToCartAnimation() {
  const [animating, setAnimating] = useState(false);
  const [animData, setAnimData] = useState({ x: 0, y: 0, img: '' });

  /**
   * Inicia la animación de agregar al carrito
   * @param {Event} event - Evento del click en el botón
   * @param {string} imageSrc - URL de la imagen del producto
   */
  const animateAddToCart = useCallback((event, imageSrc) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    console.log('🚀 Animación iniciada!', { 
      x: rect.left + rect.width / 2, 
      y: rect.top + rect.height / 2, 
      img: imageSrc 
    });
    
    setAnimData({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      img: imageSrc
    });
    
    setAnimating(true);
    
    // Terminar animación después de 1500ms (ajustado para nueva duración)
    setTimeout(() => {
      setAnimating(false);
      console.log('✅ Animación completada');
    }, 1500);
  }, []);

  return { animating, animData, animateAddToCart };
}
