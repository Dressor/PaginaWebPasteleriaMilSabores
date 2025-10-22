import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Navbar', () => {
  it('muestra la marca en el navbar', () => {
    render(<App />);
    const maybeBrand = screen.queryByText(/mil sabores/i);
    expect(maybeBrand).not.toBeNull(); // cámbialo por tu texto real si es otro
  });
});
