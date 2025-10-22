// src/__tests__/utils.spec.js
import { formatPrice } from '../utils/format';

describe('formatPrice', () => {
  it('formatea a moneda CLP sin decimales', () => {
    const out = formatPrice(12990);
    expect(out).toMatch(/\$\s?12\.990|12.990/);
  });
});
