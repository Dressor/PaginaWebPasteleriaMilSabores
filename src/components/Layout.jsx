// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartToasts from './CartToasts';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* Toasts globales del carrito */}
      <CartToasts />
    </>
  );
}
