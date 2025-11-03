import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      if (typeof window.scrollTo === 'function') {
        // Preferimos scroll instantáneo para que no haya animación entre rutas
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (typeof window.scroll === 'function') {
        window.scroll(0, 0);
      } else {
        document?.documentElement?.scrollTo?.(0, 0);
      }
    } catch {
      // Entornos de prueba (jsdom) pueden no implementar scrollTo
    }
  }, [pathname]);
  return null;
}
