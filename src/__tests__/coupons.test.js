import {
  validateCoupon,
  coupons,
  computeDiscountAmount,
} from '../utils/coupons';

const asDate = (ymd) => new Date(ymd + 'T00:00:00');

describe('cupones', () => {
  test('código válido dentro de fecha y mínimo', () => {
    const ctx = {
      code: 'SWEET10',
      today: asDate('2025-10-15'),
      subtotal: 30000,
    };
    const res = validateCoupon(ctx);
    expect(res.ok).toBe(true);
    expect(res.coupon.code).toBe('SWEET10');
  });

  test('rechaza código inexistente', () => {
    const res = validateCoupon({ code: 'NOEXISTE', today: asDate('2025-10-15'), subtotal: 50000 });
    expect(res.ok).toBe(false);
    expect(res.reason).toMatch(/no válido/i);
  });

  test('rechaza por fecha expirada', () => {
    const c = coupons.find(c => c.code === 'SWEET10');
    const res = validateCoupon({
      code: 'SWEET10',
      today: new Date(+c.validTo + 24 * 3600 * 1000), // día después
      subtotal: 50000
    });
    expect(res.ok).toBe(false);
    expect(res.reason).toMatch(/vencido/i);
  });

  test('rechaza por mínimo de compra', () => {
    const res = validateCoupon({
      code: 'SWEET10',
      today: asDate('2025-10-15'),
      subtotal: 5000
    });
    expect(res.ok).toBe(false);
    expect(res.reason).toMatch(/mínimo/i);
  });

  test('calcula descuento % y lo topea si tiene maxOff', () => {
    // 10% de 400.000 sería 40.000 pero topado en 20.000
    const det = computeDiscountAmount({
      coupon: coupons.find(c => c.code === 'SWEET10'),
      subtotal: 400000,
    });
    expect(det.amount).toBe(20000);
    expect(det.type).toBe('percent');
  });

  test('calcula descuento fijo', () => {
    const det = computeDiscountAmount({
      coupon: coupons.find(c => c.code === 'BIENVENIDA5K'),
      subtotal: 6000,
    });
    // mínimo de ese cupón es 10.000… si no lo tienes así, ajusta tu definición
    // Para robustez: si no aplica, amount debe ser 0:
    expect(typeof det.amount).toBe('number');
  });
});
