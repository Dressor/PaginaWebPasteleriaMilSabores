import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header'; // ajusta la ruta si difiere
import { renderWithProviders } from '../test-utils';

test('muestra links principales', () => {
  renderWithProviders(<Header />);

  expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /productos/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /blogs/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /nosotros/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
});
