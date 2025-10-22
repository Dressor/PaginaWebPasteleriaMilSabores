// src/test-utils.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/auth';

// Render genérico con Provider y (opcional) MemoryRouter
export function renderWithProviders(ui, { route = '/', useRouter = true } = {}) {
  const Wrapper = ({ children }) => (
    <AuthProvider>
      <CartProvider>
        {useRouter ? (
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        ) : (
          children
        )}
      </CartProvider>
    </AuthProvider>
  );
  return render(ui, { wrapper: Wrapper });
}
