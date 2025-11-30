import './App.css';
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
// Importamos el nuevo componente de seguridad
import RutaProtegida from './components/RutaProtegida';

// Importaciones directas (páginas críticas)
import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto from './pages/Producto';
import BlogNoticias from './pages/BlogNoticias'; // Lo tenías importado arriba en tu código original

// Lazy Loading
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
const AdminProductos = lazy(() => import(/* webpackPrefetch: true */ './pages/AdminProductos'));

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          
          {/* --- RUTAS PÚBLICAS (Cualquiera entra) --- */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:code" element={<Producto />} />
          
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/50-anios" element={<Blog50Anios />} />
          <Route path="/blog/tres-leches" element={<BlogTresLeches />} />
          <Route path="/blogs/noticias" element={<BlogNoticias />} />

          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/propyState" element={<PropyState />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* --- RUTAS PROTEGIDAS (Usuario Logueado) --- */}
          {/* Aquí el usuario debe estar logueado, pero no necesita ser admin */}
          <Route element={<RutaProtegida />}>
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/mis-pedidos" element={<MisPedidos />} />
             <Route path="/checkout/exito" element={<CheckoutExito />} />
          </Route>

          {/* --- RUTAS PROTEGIDAS (SOLO ADMIN) --- */}
          {/* Si alguien intenta entrar aquí sin ser admin, lo echa fuera */}
          <Route element={<RutaProtegida soloAdmin={true} />}>
             <Route path="/admin/productos" element={<AdminProductos />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}