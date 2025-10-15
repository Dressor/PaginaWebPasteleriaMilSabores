<<<<<<< HEAD
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Login from './pages/Login';
import PropyState from './pages/PropyState';
import 'bootstrap/dist/css/bootstrap.min.css';
import productos from './data/productos';
import Producto from './pages/Productos';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      {/* Navbar full-width fuera del container */}
      <nav className='navbar pastel-navbar mb-2'>
        <div className='container-fluid py-2 d-flex justify-content-between align-items-center'>
          <Link className='navbar-brand brand-font text-choco mb-0' to='/'>Pastelería 1000 Sabores</Link>
          <div className='d-flex gap-3'>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/productos'>Productos</Link>
            <Link className='nav-link' to='/blogs'>Blogs</Link>
            <Link className='nav-link' to='/propyState'>Nosotros</Link>
            <Link className='nav-link' to='/login'>Login</Link>

          </div>
        </div>
      </nav>

      <div className='container py-2 flex-grow-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/login' element={<Login />} />
          <Route path='/propyState' element={<PropyState valorInicial={100} />} />
          <Route path="/producto/:code" element={<Producto />} />
        </Routes>

        <footer className='mt-4 text-center'>
          2025 PAGINA DISEÑADA POR DUOC UC
        </footer>
      </div>
    </div>
  );
}

export default App;
=======
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
>>>>>>> main
