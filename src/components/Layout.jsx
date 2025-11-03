// src/components/Layout.jsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CartToasts from './CartToasts';
import ScrollToTop from './ScrollToTop';
// Sin spinner para no mostrar animación de carga entre rutas

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-grow-1">
        {/* No mostramos spinner para que no haya círculo de carga visible */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {/* Toasts globales del carrito */}
      <CartToasts />
    </>
  );
}
