// src/utils/coupons.js

/**
 * Definición de cupones del sistema.
 * - kind: "percent" | "fixed" | "shipping"
 * - value: número (porcentaje o monto fijo)
 * - maxOff: tope de descuento (solo para percent)
 * - minSubtotal: subtotal mínimo para aplicar el cupón
 * - validFrom / validTo: rango de vigencia (inclusive)
 */
export const coupons = [
  {
    code: 'SWEET10',
    description: '10% de descuento. Tope $20.000. Mínimo $20.000.',
    kind: 'percent',
    value: 10,                 // 10%
    maxOff: 20000,             // tope de descuento
    minSubtotal: 20000,        // compra mínima
    validFrom: new Date('2025-01-01T00:00:00'),
    validTo:   new Date('2025-12-31T23:59:59'),
  },
  {
    code: 'BIENVENIDA5K',
    description: 'Descuento de $5.000 en tu primera compra. Mínimo $10.000.',
    kind: 'fixed',
    value: 5000,               // $5.000
    minSubtotal: 10000,        // compra mínima
    validFrom: new Date('2025-01-01T00:00:00'),
    validTo:   new Date('2026-01-01T00:00:00'),
  },
  {
    code: 'FREESHIP',
    description: 'Despacho gratis en compras sobre $30.000.',
    kind: 'shipping',
    value: 1,                  // bandera (no se usa como monto)
    minSubtotal: 30000,
    validFrom: new Date('2025-01-01T00:00:00'),
    validTo:   new Date('2025-12-31T23:59:59'),
  },
];

/**
 * Normaliza fecha para comparar solo día (opcional).
 * Aquí comparamos con precisión de milisegundos (inclusive),
 * pero dejamos el helper por si quieres truncar en el futuro.
 */
function isWithin(date, from, to) {
  return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
}

/**
 * Valida un cupón con el contexto actual.
 * @param {Object} ctx
 * @param {string} ctx.code - código ingresado por el usuario
 * @param {Date}   ctx.today - fecha "hoy" (por defecto: new Date())
 * @param {number} ctx.subtotal - subtotal del carrito (sin despacho)
 * @returns {{ok: true, coupon: object} | {ok: false, reason: string}}
 */
export function validateCoupon({ code, today = new Date(), subtotal = 0 }) {
  const coupon = coupons.find(c => c.code.toUpperCase() === String(code || '').toUpperCase());
  if (!coupon) {
    return { ok: false, reason: 'El código ingresado no es válido.' };
  }

  if (!isWithin(today, coupon.validFrom, coupon.validTo)) {
    return { ok: false, reason: 'Cupón vencido o fuera de vigencia.' };
  }

  if (Number.isFinite(coupon.minSubtotal) && subtotal < coupon.minSubtotal) {
    return { ok: false, reason: `Subtotal mínimo para usar este cupón: $${coupon.minSubtotal.toLocaleString('es-CL')}.` };
  }

  return { ok: true, coupon };
}

/**
 * Calcula el monto de descuento que aplica un cupón dado el subtotal.
 * NO valida fechas ni mínimos; usa validateCoupon antes.
 * @param {Object} params
 * @param {Object} params.coupon - objeto cupón válido
 * @param {number} params.subtotal - subtotal del carrito
 * @param {number} [params.shipping=0] - costo de despacho (para "shipping")
 * @returns {{amount: number, type: 'percent'|'fixed'|'shipping'}}
 */
export function computeDiscountAmount({ coupon, subtotal, shipping = 0 }) {
  if (!coupon) return { amount: 0, type: 'fixed' };

  if (coupon.kind === 'percent') {
    const raw = Math.round((subtotal * coupon.value) / 100);
    const capped = Number.isFinite(coupon.maxOff) ? Math.min(raw, coupon.maxOff) : raw;
    return { amount: Math.max(0, capped), type: 'percent' };
  }

  if (coupon.kind === 'fixed') {
    const amount = Math.min(coupon.value, Math.max(0, subtotal));
    return { amount: Math.max(0, amount), type: 'fixed' };
  }

  if (coupon.kind === 'shipping') {
    // Descuento igual al costo de despacho (si hay), sin excederlo.
    const amount = Math.min(Math.max(0, shipping), shipping);
    return { amount, type: 'shipping' };
  }

  // fallback
  return { amount: 0, type: 'fixed' };
}

/**
 * Aplica el cupón a totales y devuelve desglose.
 * Usa validateCoupon internamente.
 * @param {Object} ctx
 * @param {number} ctx.subtotal
 * @param {number} [ctx.shipping=0]
 * @param {string} [ctx.code]
 * @param {Date}   [ctx.today]
 * @returns {{
 *   ok: boolean,
 *   reason?: string,
 *   coupon?: object,
 *   discount: number,
 *   total: number
 * }}
 */
export function applyCouponToTotals({ subtotal, shipping = 0, code, today = new Date() }) {
  const validation = validateCoupon({ code, today, subtotal });
  if (!validation.ok) {
    return {
      ok: false,
      reason: validation.reason,
      discount: 0,
      total: subtotal + shipping,
    };
  }

  const { amount } = computeDiscountAmount({ coupon: validation.coupon, subtotal, shipping });
  const total = Math.max(0, subtotal + shipping - amount);

  return {
    ok: true,
    coupon: validation.coupon,
    discount: amount,
    total,
  };
}
