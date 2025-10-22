import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Productos from '../pages/Productos';
import { CartProvider } from '../context/CartContext';

describe('Productos Page', () => {
  it('debe renderizar el catálogo de productos', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Productos />
        </CartProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/nuestros productos/i)).toBeTruthy();
  });

  it('debe mostrar filtros de búsqueda', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Productos />
        </CartProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/categoría/i)).toBeTruthy();
    expect(screen.getByLabelText(/búsqueda/i)).toBeTruthy();
  });
});
