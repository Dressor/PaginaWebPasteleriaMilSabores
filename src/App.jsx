// src/App.jsx
import './App.css';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const Productos = lazy(() => import('./pages/Productos'));
const Producto = lazy(() => import('./pages/Producto'));
const Login = lazy(() => import('./pages/Login'));
const Nosotros = lazy(() => import('./pages/Nosotros'));   // ✅ nuevo
const PropyState = lazy(() => import('./pages/PropyState')); // ✅ alias
const NotFound = lazy(() => import('./pages/NotFound'));
const Carrito = lazy(() => import('./pages/Carrito'));
 const Blogs = lazy(() => import('./pages/Blogs'));
 const Blog50Anios = lazy(() => import('./pages/Blog50Anios'));
 const BlogTresLeches = lazy(() => import('./pages/BlogTresLeches'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:code" element={<Producto />} />
          <Route path="/login" element={<Login />} />
          {/* ✅ Ambas rutas apuntan a lo mismo */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/propyState" element={<PropyState />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/50-anios" element={<Blog50Anios />} />
          <Route path="/blog/tres-leches" element={<BlogTresLeches />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
