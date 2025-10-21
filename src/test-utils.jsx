// src/test-utils.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartProvider from './context/CartContext';

// Render genérico con Provider y (opcional) MemoryRouter
export function renderWithProviders(ui, { route = '/', useRouter = true } = {}) {
  const Wrapper = ({ children }) => (
    <CartProvider>
      {useRouter ? (
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      ) : (
        children
      )}
    </CartProvider>
  );
  return render(ui, { wrapper: Wrapper });
}
