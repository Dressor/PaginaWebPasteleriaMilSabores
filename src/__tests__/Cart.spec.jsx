import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

describe('Cart Context', () => {
  it('debe renderizar el provider sin errores', () => {
    const TestComponent = () => <div>Cart Test</div>;
    
    const { container } = render(
      <BrowserRouter>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Cart Test')).toBeTruthy();
    expect(container).toBeTruthy();
  });

  it('debe exportar las funciones del contexto', () => {
    const { useCart } = require('../context/CartContext');
    expect(useCart).toBeDefined();
    expect(typeof useCart).toBe('function');
  });
});
