// src/__tests__/Home.hero.test.jsx
import React from 'react';
import Home from '../pages/Home';
import { renderWithProviders } from '../test-utils';
import { screen } from '@testing-library/react';

test('el hero muestra un título legible', () => {
  renderWithProviders(<Home />);

  // Hay varios <h1> en el carrusel; validamos específicamente el “bienvenido…”
  const heading = screen.getByText(/bienvenido a pastelería 1000 sabores/i);
  expect(heading).toBeInTheDocument();
});
