import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Elementos del Header', () => {
  it('Busca el nombre principal', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Pastelería Mil Sabores/i)
    ).toBeInTheDocument();
  });

  it('Busca que la imagen tenga descripción', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('img', { name: /logo pastelería/i })
    ).toBeInTheDocument();
  });

  it('Busca los links de navegación principales', () => {
    render(
        <MemoryRouter>
        <Header />
        </MemoryRouter>
    );

    // Links internos (react-router)
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();

    // Link externo: Blogs y Noticias
    const noticias = screen.getByRole('link', { name: /blogs y noticias/i });
    const href = noticias.getAttribute('href');
    expect(href).toContain('duoc.cl/noticias');
    });

  it('Valida la configuración de como se ve el boton busqueda', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('searchbox', { name: /buscar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });
});
