/**
 * Utilidades para optimización de imágenes.
 * Proporciona funciones para cargar imágenes de manera eficiente.
 * 
 * @module imageOptimization
 */

/**
 * Genera srcset para imágenes responsive.
 * Útil para cuando se implementen imágenes en múltiples tamaños.
 * 
 * @param {string} basePath - Ruta base de la imagen sin extensión
 * @param {string} extension - Extensión del archivo (ej: 'jpg', 'png', 'webp')
 * @param {Array<number>} sizes - Array de anchos disponibles (ej: [320, 640, 1024])
 * @returns {string} String srcset para usar en <img>
 * 
 * @example
 * const srcset = generateSrcSet('/images/producto', 'jpg', [320, 640, 1024]);
 * // Retorna: "/images/producto-320.jpg 320w, /images/producto-640.jpg 640w, ..."
 */
export const generateSrcSet = (basePath, extension, sizes = [320, 640, 1024, 1920]) => {
  return sizes
    .map(size => `${basePath}-${size}.${extension} ${size}w`)
    .join(', ');
};

/**
 * Genera atributos sizes para imágenes responsive.
 * Define qué tamaño de imagen usar según el viewport.
 * 
 * @param {Object} breakpoints - Objeto con breakpoints y tamaños
 * @returns {string} String sizes para usar en <img>
 * 
 * @example
 * const sizes = generateSizes({
 *   '(max-width: 768px)': '100vw',
 *   '(max-width: 1200px)': '50vw',
 *   'default': '33vw'
 * });
 */
export const generateSizes = (breakpoints) => {
  const entries = Object.entries(breakpoints);
  const mediaQueries = entries
    .filter(([key]) => key !== 'default')
    .map(([query, size]) => `${query} ${size}`);
  
  const defaultSize = breakpoints.default || '100vw';
  return [...mediaQueries, defaultSize].join(', ');
};

/**
 * Detecta si el navegador soporta WebP.
 * 
 * @returns {Promise<boolean>} True si soporta WebP, false si no
 */
export const supportsWebP = async () => {
  if (typeof window === 'undefined') return false;
  
  // Usar feature detection del navegador
  if (!window.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  
  try {
    const blob = await fetch(webpData).then(r => r.blob());
    return await createImageBitmap(blob).then(() => true, () => false);
  } catch {
    return false;
  }
};

/**
 * Obtiene la URL de imagen óptima según el soporte del navegador.
 * 
 * @param {string} imagePath - Ruta de la imagen
 * @param {boolean} hasWebP - Si existe versión WebP disponible
 * @returns {string} URL de la imagen óptima
 * 
 * @example
 * const optimizedSrc = await getOptimizedImageSrc('/images/producto.jpg', true);
 * // Puede retornar '/images/producto.webp' si el navegador lo soporta
 */
export const getOptimizedImageSrc = async (imagePath, hasWebP = false) => {
  if (!hasWebP) return imagePath;
  
  const webpSupported = await supportsWebP();
  if (webpSupported) {
    return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return imagePath;
};

/**
 * Carga una imagen de manera lazy con placeholder.
 * 
 * @param {string} src - URL de la imagen
 * @param {string} placeholderSrc - URL del placeholder (opcional)
 * @returns {Promise<string>} Promise que se resuelve con la URL de la imagen cargada
 */
export const lazyLoadImage = (src, placeholderSrc = null) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Error cargando imagen: ${src}`));
    
    // Si hay placeholder, cargarlo primero
    if (placeholderSrc) {
      const placeholder = new Image();
      placeholder.src = placeholderSrc;
    }
    
    img.src = src;
  });
};

/**
 * Calcula el tamaño óptimo de imagen según el viewport actual.
 * 
 * @param {Array<number>} availableSizes - Tamaños disponibles de la imagen
 * @param {number} containerWidth - Ancho del contenedor (opcional)
 * @returns {number} Tamaño óptimo a cargar
 */
export const getOptimalImageSize = (availableSizes, containerWidth = null) => {
  const width = containerWidth || window.innerWidth;
  const pixelRatio = window.devicePixelRatio || 1;
  const targetWidth = width * pixelRatio;
  
  // Encontrar el tamaño más pequeño que sea mayor o igual al target
  const optimal = availableSizes
    .sort((a, b) => a - b)
    .find(size => size >= targetWidth);
  
  // Si no hay ninguno lo suficientemente grande, usar el más grande
  return optimal || availableSizes[availableSizes.length - 1];
};

/**
 * Genera un placeholder LQIP (Low Quality Image Placeholder).
 * Útil para mejorar la percepción de carga.
 * 
 * @param {string} imagePath - Ruta de la imagen
 * @returns {string} Data URL del placeholder (placeholder genérico por ahora)
 */
export const generateLQIP = (imagePath) => {
  // En un entorno real, esto generaría una versión muy pequeña y borrosa
  // Por ahora retornamos un SVG placeholder
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#f0f0f0"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="sans-serif" font-size="12" fill="#999">
        Cargando...
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * Hook helper para usar imágenes optimizadas en componentes React.
 * 
 * @param {string} src - Ruta de la imagen original
 * @param {Object} options - Opciones de optimización
 * @returns {Object} Objeto con src optimizado y estado de carga
 * 
 * @example
 * // En un componente React:
 * const { src, isLoading } = useOptimizedImage('/images/producto.jpg', {
 *   sizes: [320, 640, 1024],
 *   hasWebP: true
 * });
 */
export const useOptimizedImage = (src, options = {}) => {
  // Esta es una función helper que se puede usar con un custom hook
  const {
    sizes = [320, 640, 1024],
    hasWebP = false,
    useLQIP = true
  } = options;
  
  return {
    src,
    sizes: sizes.join(', '),
    loading: 'lazy',
    decoding: 'async',
    ...(useLQIP && { placeholder: generateLQIP(src) })
  };
};

/**
 * Precarga imágenes críticas para mejorar LCP (Largest Contentful Paint).
 * 
 * @param {Array<string>} imageUrls - Array de URLs de imágenes a precargar
 */
export const preloadCriticalImages = (imageUrls) => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Observador de imágenes para lazy loading manual.
 * Útil cuando no se puede usar el atributo loading="lazy" nativo.
 * 
 * @param {Function} callback - Función a ejecutar cuando la imagen sea visible
 * @param {Object} options - Opciones del IntersectionObserver
 * @returns {IntersectionObserver} Observer configurado
 */
export const createImageObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, { ...defaultOptions, ...options });
};
