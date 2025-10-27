import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import CartProvider, { useCart } from '../context/CartContext';

// TestApp expone la API del contexto y actualiza cuando cambian los items
function TestApp({ onUpdate }) {
  const cart = useCart();
  React.useEffect(() => {
    if (onUpdate) onUpdate({
      items: cart.items,
      addToCart: cart.addToCart,
      removeFromCart: cart.removeFromCart,
      getPricing: cart.getPricing,
      setFechaEntrega: cart.setFechaEntrega,
      validarOrden: cart.validarOrden
    });
  }, [cart.items, cart.getPricing, cart.setFechaEntrega, cart.validarOrden, cart.addToCart, cart.removeFromCart, onUpdate]);

  return <div data-testid="items">{cart.items.map(i => `${i.codigo}:${i.qty}`).join(',')}</div>;
}

describe('CartContext - operaciones de carrito y precios', () => {
  it('addToCart respeta stock y acumula cantidad', async () => {
    const prod = { codigo: 'p1', nombre: 'Prod 1', precio: 1000, stock: 2 };
    let api;
    render(
      <CartProvider>
        <TestApp onUpdate={(a) => { api = a; }} />
      </CartProvider>
    );

    await waitFor(() => expect(api).toBeDefined());

    act(() => api.addToCart(prod, 1));
    act(() => api.addToCart(prod, 2)); // intenta exceder stock

    await waitFor(() => {
      const item = api.items.find(i => i.codigo === 'p1');
      expect(item).toBeDefined();
      expect(item.qty).toBeLessThanOrEqual(2);
    });
  });

  it('removeFromCart reduce qty y elimina cuando llega a 0', async () => {
    const prod = { codigo: 'p2', nombre: 'Prod 2', precio: 500, stock: 10 };
    let api;
    render(
      <CartProvider>
        <TestApp onUpdate={(a) => { api = a; }} />
      </CartProvider>
    );

    await waitFor(() => expect(api).toBeDefined());

    act(() => api.addToCart(prod, 3));
    await waitFor(() => expect(api.items.find(i => i.codigo === 'p2')).toBeDefined());

    act(() => api.removeFromCart('p2', 2));
    await waitFor(() => {
      const after = api.items.find(i => i.codigo === 'p2');
      expect(after.qty).toBe(1);
    });

    act(() => api.removeFromCart('p2', 1));
    await waitFor(() => {
      const gone = api.items.find(i => i.codigo === 'p2');
      expect(gone).toBeUndefined();
    });
  });

  it('getPricing aplica descuento por monto (>=30000 -> 10%)', async () => {
    let api;
    render(
      <CartProvider>
        <TestApp onUpdate={(a) => { api = a; }} />
      </CartProvider>
    );

    await waitFor(() => expect(api).toBeDefined());

    act(() => api.addToCart({ codigo: 'big', nombre: 'Grande', precio: 31000, stock: 5 }, 1));

    await waitFor(() => {
      const pricing = api.getPricing();
      expect(pricing.subtotal).toBeGreaterThanOrEqual(31000);
      const found = pricing.descuentos.find(d => d.key === 'monto');
      expect(found).toBeDefined();
      expect(Math.round(found.amount)).toBe(Math.round(pricing.subtotal * 0.10));
    });
  });

  it('validarOrden retorna errores cuando faltan fechaEntrega o items', async () => {
    let api;
    render(
      <CartProvider>
        <TestApp onUpdate={(a) => { api = a; }} />
      </CartProvider>
    );

    await waitFor(() => expect(api).toBeDefined());

  const errs = api.validarOrden();
  expect(Array.isArray(errs)).toBeTruthy();
    expect(errs.length).toBeGreaterThan(0);

    act(() => api.setFechaEntrega(new Date(Date.now() + 48 * 3600 * 1000).toISOString()));

    await waitFor(() => {
      const errs2 = api.validarOrden();
      expect(errs2).toContain('Tu carrito está vacío.');
    });
  });
});
