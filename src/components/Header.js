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
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg pastel-navbar border-bottom sticky-top" aria-label="Barra de navegación principal">
        <div className="container-fluid">
          {/* BRAND */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
            <img
              src={logoPasteleria}
              alt="Logo Pastelería 1000 Sabores"
              height={36}
              width={36}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="brand-font text-choco fs-5 text-nowrap">Pastelería 1000 Sabores</span>
          </Link>

          {/* TOGGLER */}
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

          {/* CONTENIDO */}
          <div className="collapse navbar-collapse" id="navbarMain">
            {/* IZQUIERDA: links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink end className={navClass} to="/">Inicio</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/productos">Productos</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/blogs">Blogs</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/nosotros">Nosotros</NavLink></li>

              {!isAuthenticated ? (
                <li className="nav-item">
                  <NavLink className={navClass} to="/login">Login</NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
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
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            {/* DERECHA: buscador (chico), tema, carrito */}
            <div className="d-flex align-items-center gap-2">
              <form className="d-none d-md-block" role="search" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group input-group-sm">
                  <label htmlFor="navbarSearch" className="visually-hidden">Buscar</label>
                  <input
                    id="navbarSearch"
                    className="form-control"
                    type="search"
                    placeholder="Buscar…"
                    aria-label="Buscar productos o artículos"
                  />
                  <button className="btn btn-outline-choco" type="submit">Buscar</button>
                </div>
              </form>

              <ThemeToggle />
              <CartBadge />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
