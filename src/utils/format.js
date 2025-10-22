// src/utils/format.js (si no lo tienes):
export const formatPrice = (value) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
