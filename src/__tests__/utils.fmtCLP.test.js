import { fmtCLP } from '../context/CartContext';

describe('fmtCLP', () => {
  test('formatea enteros en CLP', () => {
    expect(fmtCLP(1234)).toBe('$1.234');
  });

  test('redondea y separa miles', () => {
    expect(fmtCLP(1234567.89)).toBe('$1.234.568');
  });

  test('maneja 0 y valores falsy', () => {
    expect(fmtCLP(0)).toBe('$0');
    expect(fmtCLP(null)).toBe('$0');
    expect(fmtCLP(undefined)).toBe('$0');
  });
});
