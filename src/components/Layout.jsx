// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CartToasts from './CartToasts';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
      {/* Toasts globales del carrito */}
      <CartToasts />
    </>
  );
}
