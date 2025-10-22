// src/components/Header.js
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logoPasteleria from '../assets/img/logo.png';
import CartBadge from './CartBadge';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/auth';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                        // limpia estado + localStorage
    navigate('/', { replace: true }); // vuelve al Home y evita “atrás”
  };

  return (
    <header>
      {/* pastel-navbar viene de tu index.css. 
         Sumamos clases Bootstrap base: navbar, navbar-expand-lg */}
      <nav className="navbar navbar-expand-lg pastel-navbar border-bottom" aria-label="Barra de navegación principal">
        {/* container para ancho legible; si quieres todo pegado a los bordes, cambia a container-fluid */}
        <div className="container">
          {/* BRAND (logo + texto) */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
            <img
              src={logoPasteleria}
              alt="Logo Pastelería 1000 Sabores"
              height={40}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="brand-font text-choco">Pastelería 1000 Sabores</span>
          </Link>

          {/* Toggler mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido colapsable */}
          <div className="collapse navbar-collapse" id="navbarMain">
            {/* Links a la izquierda */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink end className={navClass} to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/productos">Productos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/blogs">Blogs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/nosotros">Nosotros</NavLink>
              </li>

              {/* Auth */}
              {!isAuthenticated ? (
                <li className="nav-item">
                  <NavLink className={navClass} to="/login">Login</NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  {/* Botón estilo link para dropdown. 
                     Con bundle de Bootstrap cargado, funciona out-of-the-box */}
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    👋 {user?.username ?? 'Usuario'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    {/* Si en el futuro agregas /admin o /perfil, puedes añadir items aquí */}
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            {/* Derecha: buscador + tema + carrito */}
            <div className="d-flex align-items-center gap-2">
              {/* Buscador oculto en XS para no saturar la navbar */}
              <form className="d-none d-md-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="navbarSearch" className="visually-hidden">Buscar</label>
                <input
                  id="navbarSearch"
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar…"
                  aria-label="Buscar productos o artículos"
                />
                <button className="btn btn-choco" type="submit">Buscar</button>
              </form>

              {/* Toggle de tema (respeta tus variables CSS) */}
              <ThemeToggle />

              {/* Badge del carrito (ícono + contador) */}
              <CartBadge />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
