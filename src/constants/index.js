/**
 * Constantes y configuraciones globales de la aplicación.
 * Centraliza valores que se usan en múltiples lugares.
 * 
 * @module constants
 */

/**
 * Información de la empresa
 */
export const COMPANY_INFO = {
  name: 'Pastelería 1000 Sabores',
  phone: '+56 9 8765 4321',
  email: 'contacto@1000sabores.cl',
  address: 'Av. Principal 1234, Santiago',
  foundedYear: 1975,
};

/**
 * Redes sociales
 */
export const SOCIAL_MEDIA = {
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  whatsapp: 'https://wa.me/56987654321',
};

/**
 * Configuración del carrito de compras
 */
export const CART_CONFIG = {
  minPurchase: 10000, // Mínimo de compra en CLP
  deliveryAdvanceDays: 1, // Días mínimos de anticipación
  anticipatedReserveDays: 3, // Días para descuento por anticipación
  maxItemsPerProduct: 50, // Cantidad máxima por producto
};

/**
 * Configuración de descuentos
 */
export const DISCOUNT_CONFIG = {
  minAmountForDiscount: 30000, // Monto mínimo para descuento por compra
  amountDiscountPercent: 0.10, // 10% descuento por monto
  anticipatedDiscountPercent: 0.05, // 5% descuento por anticipación
  anniversaryDiscountPercent: 0.20, // 20% descuento por aniversario
  anniversaryDate: { month: 10, day: 15 }, // 15 de noviembre (mes 10 = noviembre)
};

/**
 * Mensajes de validación
 */
export const VALIDATION_MESSAGES = {
  required: 'Este campo es requerido',
  minLength: (min) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max) => `No puede exceder ${max} caracteres`,
  invalidEmail: 'Correo electrónico inválido',
  invalidPhone: 'Número de teléfono inválido',
  invalidDate: 'Fecha inválida',
  minAmount: (amount) => `El monto mínimo es ${amount}`,
  maxAmount: (amount) => `El monto máximo es ${amount}`,
};

/**
 * Rutas de navegación
 */
export const ROUTES = {
  home: '/',
  products: '/productos',
  product: '/producto/:code',
  cart: '/carrito',
  login: '/login',
  about: '/nosotros',
  blogs: '/blogs',
  notFound: '*',
};

/**
 * Claves de localStorage
 */
export const STORAGE_KEYS = {
  auth: 'auth:user',
  cart: 'cart:items',
  theme: 'theme:preference',
};

/**
 * Configuración de animaciones
 */
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    default: [0.4, 0.0, 0.2, 1],
    easeOut: [0.0, 0.0, 0.2, 1],
    easeIn: [0.4, 0.0, 1, 1],
  },
};

/**
 * Breakpoints responsive
 */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

/**
 * Configuración SEO por defecto
 */
export const DEFAULT_SEO = {
  title: 'Pastelería 1000 Sabores',
  description: 'Pastelería artesanal con más de 50 años de tradición. Tortas, postres y productos personalizados.',
  keywords: ['pastelería', 'tortas', 'postres', 'artesanal', 'Chile', 'Santiago'],
  author: 'Pastelería 1000 Sabores',
  ogImage: '/logo192.png',
};

/**
 * Credenciales de demo (solo para desarrollo/testing)
 * En producción, esto debería manejarse mediante variables de entorno
 */
export const DEMO_CREDENTIALS = {
  username: 'admin',
  password: '123456',
};

/**
 * Configuración de timeout y delays
 */
export const TIMEOUTS = {
  toast: 3200, // Duración de notificaciones toast
  sessionExpiry: 8 * 60 * 60 * 1000, // 8 horas en milisegundos
  debounce: 300, // Delay para debounce en búsquedas
};

/**
 * Expresiones regulares útiles
 */
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+?56)?(\s?)(9)(\s?)([0-9]{8})$/,
  onlyNumbers: /^\d+$/,
  onlyLetters: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
  alphanumeric: /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]+$/,
};
