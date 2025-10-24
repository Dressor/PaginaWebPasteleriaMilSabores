// src/App.jsx
import './App.css';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import BlogNoticias from './pages/BlogNoticias';
import { AuthProvider } from './context/AuthContext';




// Páginas (lazy)
const Home = lazy(() => import('./pages/Home'));
const Productos = lazy(() => import('./pages/Productos'));
const Producto = lazy(() => import('./pages/Producto'));
const Login = lazy(() => import('./pages/Login'));
const Registro = lazy(() => import('./pages/Registro'));
const Nosotros = lazy(() => import('./pages/Nosotros'));         // página real
const PropyState = lazy(() => import('./pages/PropyState'));     // alias hacia Nosotros
const Blogs = lazy(() => import('./pages/Blogs'));
const Blog50Anios = lazy(() => import('./pages/Blog50Anios'));
const BlogTresLeches = lazy(() => import('./pages/BlogTresLeches'));
const Carrito = lazy(() => import('./pages/Carrito'));
const Checkout = lazy(() => import('./pages/Checkout'));
const MisPedidos = lazy(() => import('./pages/MisPedidos'));
const CheckoutExito = lazy(() => import('./pages/CheckoutExito'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            {/* Catálogo */}
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:code" element={<Producto />} />

            {/* Blogs */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/50-anios" element={<Blog50Anios />} />
            <Route path="/blog/tres-leches" element={<BlogTresLeches />} />
            <Route path="/blogs/noticias" element={<BlogNoticias />} />

            {/* Nosotros (y alias de compatibilidad) */}
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/propyState" element={<PropyState />} />

          {/* Login / Registro / Carrito / Checkout */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} />
          <Route path="/checkout/exito" element={<CheckoutExito />} />            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}