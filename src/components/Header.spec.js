import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header.jsx';
import { AuthProvider } from '../context/AuthContext';
import CartProvider from '../context/CartContext';

describe('Elementos del Header', () => {
  beforeEach(() => {
    // Asegurar que no haya usuario autenticado persistente en el entorno de Karma
    // (ChromeHeadless mantiene sessionStorage/localStorage entre tests en el mismo run)
    sessionStorage.clear();
    localStorage.clear();
  });
  it('Busca el nombre principal', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    // Match a portion of the brand to be resilient to copy changes
    expect(screen.getByText(/Pastelería/i)).toBeTruthy();
  });

  it('Busca que la imagen tenga descripción', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('img', { name: /logo pastelería/i })).toBeTruthy();
  });

  it('Busca los links de navegación principales', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

  // Links internos (react-router)
  expect(screen.getByRole('link', { name: /inicio/i })).toBeTruthy();
  expect(screen.getByRole('link', { name: /login/i })).toBeTruthy();

  // Blogs link exists and points to the internal blogs route
  const blogs = screen.getByRole('link', { name: /blogs/i });
  expect(blogs).toBeTruthy();
  expect(blogs.getAttribute('href')).toContain('/blogs');
    });

  it('Valida la configuración de como se ve el boton busqueda', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  expect(screen.getByRole('searchbox', { name: /buscar/i })).toBeTruthy();
  expect(screen.getByRole('button', { name: /buscar/i })).toBeTruthy();
  });
});
