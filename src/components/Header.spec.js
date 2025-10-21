// src/components/Header.spec.js
import React from 'react';
import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../test-utils';

describe('Elementos del Header', () => {
  it('Busca el nombre principal', () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByText(/1000\s*Sabores/i)
    ).toBeInTheDocument();
  });

  it('Busca que la imagen tenga descripción', () => {
    renderWithProviders(<Header />);
    const imgs = screen.getAllByRole('img');
    expect(imgs.some(img => (img.getAttribute('alt') || '').trim().length > 0)).toBe(true);
  });

  it('Verifica los links de navegación principales', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /productos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blogs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /nosotros/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  it('Valida el botón de búsqueda', () => {
    renderWithProviders(<Header />);
    const searchBtn =
      screen.queryByRole('button', { name: /buscar/i }) ||
      screen.queryByRole('textbox', { name: /buscar/i });
    expect(searchBtn).toBeTruthy();
  });
});
