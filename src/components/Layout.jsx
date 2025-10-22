// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartToasts from './CartToasts';
import AccessibilityMenu from './AccessibilityMenu';

export default function Layout() {
  return (
    // Alto completo y columnas: header -> contenido -> footer
    <div className="d-flex flex-column min-vh-100">
      {/* Skip link accesible (aparece al enfocarlo con TAB) */}
      <a
        href="#contenido-principal"
        className="visually-hidden-focusable position-absolute top-0 start-0 m-2 btn btn-outline-secondary"
      >
        Saltar al contenido
      </a>

      <Header />

      {/* Área principal semántica */}
      <main id="contenido-principal" role="main" className="flex-grow-1 py-3">
        {/* Cada página decide si usa container/row/col internamente */}
        <Outlet />
      </main>

      <Footer />

      {/* Toasts globales del carrito */}
      <CartToasts />
      
      {/* Menú de accesibilidad flotante */}
      <AccessibilityMenu />
    </div>
  );
}
