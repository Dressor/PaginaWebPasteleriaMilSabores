import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renderiza el footer de créditos', () => {
  render(<Footer />);
  expect(
    screen.getByText(/Pastelería 1000 Sabores/i)
  ).toBeInTheDocument();
});
