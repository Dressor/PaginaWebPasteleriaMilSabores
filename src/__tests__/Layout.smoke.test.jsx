import React from 'react';
import { screen } from '@testing-library/react';
import Layout from '../components/Layout'; // ajusta la ruta si difiere
import { renderWithProviders } from '../test-utils';

test('Layout envuelve con Header y Footer', () => {
  renderWithProviders(<Layout />);

  // Header con role="banner" y Footer con role="contentinfo"
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
