// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '../context/CartContext';
import CartToasts from './CartToasts';
import { ThemeProvider } from '../context/ThemeContext';

export default function Layout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="container py-2 flex-grow-1">
            <Outlet />
          </main>
          <Footer />
          <CartToasts />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
