// src/App.jsx
import './App.css';
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BlogNoticias from './pages/BlogNoticias';
import { AuthProvider } from './context/AuthContext';
// Importaciones directas de páginas críticas para evitar cualquier spinner
import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto from './pages/Producto';

// Páginas (lazy por defecto) y algunas clave en carga inmediata para evitar cualquier espera
const Login = lazy(() => import(/* webpackPrefetch: true */ './pages/Login'));
const Registro = lazy(() => import(/* webpackPrefetch: true */ './pages/Registro'));
const Nosotros = lazy(() => import(/* webpackPrefetch: true */ './pages/Nosotros'));
const PropyState = lazy(() => import(/* webpackPrefetch: true */ './pages/PropyState'));
const Blogs = lazy(() => import(/* webpackPrefetch: true */ './pages/Blogs'));
const Blog50Anios = lazy(() => import(/* webpackPrefetch: true */ './pages/Blog50Anios'));
const BlogTresLeches = lazy(() => import(/* webpackPrefetch: true */ './pages/BlogTresLeches'));
const Carrito = lazy(() => import(/* webpackPrefetch: true */ './pages/Carrito'));
const Checkout = lazy(() => import(/* webpackPrefetch: true */ './pages/Checkout'));
const MisPedidos = lazy(() => import(/* webpackPrefetch: true */ './pages/MisPedidos'));
const CheckoutExito = lazy(() => import(/* webpackPrefetch: true */ './pages/CheckoutExito'));
const NotFound = lazy(() => import(/* webpackPrefetch: true */ './pages/NotFound'));

export default function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}