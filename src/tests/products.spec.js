import productos from '../data/productos';

describe('productos data integrity', () => {
  it('exporta una lista no vacía con campos esperados', () => {
    expect(Array.isArray(productos)).toBeTruthy();
    expect(productos.length).toBeGreaterThan(0);
    productos.forEach(p => {
      expect(p.codigo).toBeDefined();
      expect(p.nombre).toBeDefined();
      expect(typeof p.precio).toBe('number');
      expect(p.precio).toBeGreaterThanOrEqual(0);
      expect(typeof p.stock).toBe('number');
      expect(p.stock).toBeGreaterThanOrEqual(0);
    });
  });
});
