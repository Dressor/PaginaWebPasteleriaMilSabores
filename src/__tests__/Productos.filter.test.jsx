// src/__tests__/Productos.filter.test.jsx
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Productos from '../pages/Productos';
import { renderWithProviders } from '../test-utils';

test('filtra por texto en la búsqueda', () => {
  renderWithProviders(<Productos />);

  const input = screen.getByPlaceholderText(/busca por nombre/i);
  fireEvent.change(input, { target: { value: 'choco' } });

  // Verifica que aparezca algún texto o tarjeta con la palabra "choco"
  const results = screen.getAllByText(/choco/i);
  expect(results.length).toBeGreaterThan(0);
});
