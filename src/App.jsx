// src/App.jsx
import './App.css';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';

// Páginas (lazy)
const Home = lazy(() => import('./pages/Home'));
const Productos = lazy(() => import('./pages/Productos'));
const Producto = lazy(() => import('./pages/Producto'));
const Login = lazy(() => import('./pages/Login'));
const Nosotros = lazy(() => import('./pages/Nosotros'));         // página real
const PropyState = lazy(() => import('./pages/PropyState'));     // alias hacia Nosotros
const Blogs = lazy(() => import('./pages/Blogs'));
const Blog50Anios = lazy(() => import('./pages/Blog50Anios'));
const BlogTresLeches = lazy(() => import('./pages/BlogTresLeches'));
const Carrito = lazy(() => import('./pages/Carrito'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
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

          {/* Nosotros (y alias de compatibilidad) */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/propyState" element={<PropyState />} />

          {/* Login / Carrito */}
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
