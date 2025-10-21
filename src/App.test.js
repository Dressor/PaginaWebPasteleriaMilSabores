// src/App.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './test-utils';

// ⬇️ Mocks de rutas/páginas lazy:
jest.mock('./pages/Home', () => ({ __esModule: true, default: () => <div>Home</div> }));
jest.mock('./pages/Productos', () => ({ __esModule: true, default: () => <div>Productos</div> }));
jest.mock('./pages/Producto', () => ({ __esModule: true, default: () => <div>Producto</div> }));
jest.mock('./pages/Login', () => ({ __esModule: true, default: () => <div>Login</div> }));

test('la app renderiza y muestra el header', async () => {
  renderWithProviders(<App />);

  // En vez de esperar a que desaparezca el spinner,
  // esperamos por algo del Header (el brand)
  const brand = await screen.findByRole('link', { name: /pastelería\s*1000\s*sabores/i });
  expect(brand).toBeInTheDocument();
});
